var mysql = require("mysql");
var inquirer = require("inquirer");
var async = require("async");

module.exports = class BamazonCustomer {

  constructor(dbConnectionConfig, selectProductPrompt, selectQuantityPrompt) {
    this.techSupportNumber = "1 800 867-5309"
    this.connection = mysql.createConnection(dbConnectionConfig);
    this.selectProductPrompt = selectProductPrompt;
    this.selectQuantityPrompt = selectQuantityPrompt;
  }

  shop() {
    this.connection.connect(err => {
      if (err) {
        this._exitOnError(
          err,
          "\nSorry, but we're unable to accept purchase requests at this time.",
          `Please call technical support at ${this.techSupportNumber} to get a status update.`
          );
        } else {
        const welcomeMsg = "Welcome to Bamazon, your complete source for some things.";
        console.log(`\n${welcomeMsg}`);
        this._startShopping(this._stopShoppingCB.bind(this));
      }
    });
  }

  _startShopping(callback) {
    async.waterfall([
        this._listProducts.bind(this),
        this._selectProduct.bind(this),
        this._selectQuantity.bind(this),
        this._checkInStock.bind(this),
        this._fulfillOrder.bind(this)
      ], 
      (err, results) => {
        callback(err, results);
      });
  }

  _stopShoppingCB(err, results) {
    if (err) {
      if (err.retry) {
        // Low severity error.  Report error but keep shopping.
        this._reportError(err, err.implication, err.advice)
      } else {
        // Serious error.  Stop shopping.
        this._exitOnError(err, err.implication, err.advice)
      }
    }
    // Allow customer to make more purchases.
    this._startShopping(this._stopShoppingCB.bind(this));
  }

  _exitOnError(err, implication, advice) {
    this._reportError(err, implication, advice);
    this.connection.end();
    process.exit(err.errno);
  }

  _reportError(err, implication, advice) {
    if (implication) console.log(implication);
    if (advice) console.log(advice)
    console.log(`${err.message}\n`);
  }

  _exitOnQuit(choice) {
    if (choice.toLowerCase() === "q") {
      console.log("Thank you for visiting Bamazon\n");
      this.connection.end();
      process.exit(0);
    }
  }

  _contextualizeError(err, implication, advice, retry) {
    err.implication = implication;
    err.advice = advice;
    err.retry = retry
  }

  _listProducts(callback) {
    this.connection.query(
      "SELECT item_id, product_name, department_name, price, stock_quantity FROM products",
      (err, res) => {
          if (err) {
            this._contextualizeError(
              err,
              "\nSorry, but we're unable to display the product catalog.",
              `Please call technical support at ${this.techSupportNumber} to get a status update.`
            );
            callback(err);
          } else {
            console.log("");
            console.table(res);
            callback(null);
          }
      }
    );
  }

  _selectProduct(callback) {
    inquirer.prompt(this.selectProductPrompt).then(answer => {
        this._exitOnQuit(answer.choice);
        this.connection.query("SELECT item_id FROM products WHERE ?",
        {
          "item_id" : parseInt(answer.choice)
        },
        (err, res) => {
          if (err) {
            this._contextualizeError(
              err,
              "\nWe apologize, but something odd happened while checking the database for that item.",
              `Please report this issue to technical support at ${this.techSupportNumber}.`,
            );
            callback(err);
          } else if (res.length == 0) {
            let invalidItemErr = new Error("");
            let retry = true;
            this._contextualizeError(
              invalidItemErr,
              "\nInvalid item id.",
              "Please try again.",
              retry
            );
            callback(invalidItemErr);
          } else {
            callback(null, answer.choice);
          }
        });
    });
  }

  _selectQuantity(itemId, callback) {
    inquirer.prompt(this.selectQuantityPrompt).then(answer => {
      this._exitOnQuit(answer.choice);
      let orderQuantity = parseInt(answer.choice);
      callback(null, itemId, orderQuantity);
    });
  }

  _checkInStock(itemId, orderQuantity, callback) {
    let query = "SELECT stock_quantity, product_name, price FROM products WHERE ?"
    this.connection.query(
        query, 
        { item_id: parseInt(itemId) },
        (err, res) => {
          if (err) {
            callback(err);
          } else if (res[0].stock_quantity < orderQuantity) {
            let qntyErr = new Error("Insufficient quantity");
            let retry = true;
            this._contextualizeError(
                qntyErr,
                "\nWe don't have enough of that product to complete your order.",
                "Please reduce your amount or check back when we have restocked.",
                retry);
            callback(qntyErr);
          } else {
            let unitPrice = res[0].price
            callback(null, itemId, orderQuantity, unitPrice)
          }
        }
    );
  }

  _fulfillOrder(itemId, itemQnty, unitPrice, callback) {
    const query = `UPDATE products SET stock_quantity = stock_quantity - ${itemQnty} WHERE item_id = ${itemId}`;
    this.connection.query(query, (err, res) => {
        if (err) {
          this._contextualizeError(
            err,
            "\nWe apologize, but something odd happened while updating database with the new stock quantity.",
            `Please report this issue to technical support at ${this.techSupportNumber}.`
          );
          callback(err);
        } else {
          let totalCost = (parseFloat(itemQnty) * parseFloat(unitPrice)).toFixed(2);
          console.log("Total cost is $", totalCost);
          callback(null);
        }
    })
  }
} // end class Bamazon