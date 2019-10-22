var mysql = require("mysql");
var inquirer = require("inquirer");

const DB = "bamazon_db"

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: DB,
    user: "root",
    password: ""
});

connection.connect(err => {
    if (err) throw err;
    listProducts();
});

const WELCOME_MESSAGE = "Welcome to Bamazon, your complete source for some things\n";

function listProducts() {
    console.log(WELCOME_MESSAGE);
    connection.query(
        "SELECT item_id, product_name, price FROM products",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            buyProduct();
        }
    );
}

const ITEM_ID_PROMPT = "Enter the item_id of the product you wish to buy: "
const ITEM_QNTY_PROMPT = "How many units would you like to buy: "
const ITEM_ID_FAIL_PROMPT = "Please enter a valid item ID. "
const ITEM_QNTY_FAIL_PROMPT = "Please enter a valid quantity. "
const byProductPrompts = [
  {
    type: 'input',
    name: 'itemId',
    message: ITEM_ID_PROMPT,
    validate: function(value) {
      var pass = value.match(
        /^[1-9]{1}[0-9]{0,}$/
      );
      if (pass) {
        return true;
      }
      return ITEM_ID_FAIL_PROMPT;
    }
  },
  {
    type: 'input',
    name: 'itemQnty',
    message: ITEM_QNTY_PROMPT,
    validate: function(value) {
      var pass = value.match(
        /^[1-9]{1}[0-9]{0,}$/
      );
      if (pass) {
        return true;
      }
      return ITEM_QNTY_FAIL_PROMPT;
    }
  }
];

const BUY_PRODUCTS_FAIL = "Someting about your request confused me.\nContact your support team.";

function buyProduct() {
    inquirer.prompt(byProductPrompts).then( answers => {
        if (answers.itemId && answers.itemQnty) {
            placeOrder(answers.itemId, answers.itemQnty);
        } else {
            console.log(BUY_PRODUCTS_FAIL)
        }
    });
}

function placeOrder(itemId, itemQnty) {
    console.log(`Placing an order for ${itemQnty} units of item id ${itemId}`);
    fulfillIfInStock(itemId, itemQnty);
}

function fulfillIfInStock(itemId, itemQnty) {
    let query = "SELECT stock_quantity, product_name, price FROM products WHERE ?"
    connection.query(
        query, 
        { item_id: parseInt(itemId) },
        (err, res) => {
            if (err) throw err;
            if (res[0].stock_quantity >= parseInt(itemQnty)) {
                let unitPrice = res[0].price
                fulfillOrder(itemId, itemQnty, unitPrice)
            } else {
                console.log("Insufficient quantity.")
            }
            connection.end();
        }
    );
}

function fulfillOrder(itemId, itemQnty, unitPrice) {
    const query = `UPDATE products SET stock_quantity = stock_quantity - ${itemQnty} WHERE item_id = ${itemId}`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        let totalCost = parseInt(itemQnty) * parseFloat(unitPrice);
        console.log("Total cost is $", totalCost);
    })
}
