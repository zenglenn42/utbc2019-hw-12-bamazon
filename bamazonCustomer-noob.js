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

const WELCOME_MESSAGE = "Welcome to Bamazon, your complete source for certain things!";
connection.connect(err => {
    if (err) throw err;
    console.log(WELCOME_MESSAGE);
    listProducts();
});


function listProducts() {
    connection.query(
        "SELECT item_id,product_name,department_name,price,stock_quantity FROM products",
        (err, res) => {
            if (err) throw err;
            console.log("");
            console.table(res);
            selectProduct();
        }
    );
}

const ITEM_ID_PROMPT = "Enter the item_id of the product you wish to buy (or Q to quit): "
const ITEM_ID_FAIL_PROMPT = "Please enter a valid item ID. "
const selectProductPrompt = [
  {
    type: 'input',
    name: 'choice',
    message: ITEM_ID_PROMPT,
    validate: function(value) {
      var pass = value.match(/^[1-9]{1}[0-9]{0,}$/) || value.match(/^[qQ].*/);
        if (pass) {
          return true;
        }
        return ITEM_ID_FAIL_PROMPT;
      }
    }
  ];
  
  const ITEM_QNTY_PROMPT = "How many units would you like to buy (or Q to quit): "
  const ITEM_QNTY_FAIL_PROMPT = "Please enter a valid quantity. "
  const selectQuantityPrompt = [
    {
      type: 'input',
      name: 'choice',
      message: ITEM_QNTY_PROMPT,
      validate: function(value) {
      var pass = value.match(/^[1-9]{1}[0-9]{0,}$/) || value.match(/^[qQ].*/);
      if (pass) {
        return true;
      }
      return ITEM_QNTY_FAIL_PROMPT;
    }
  }
];

function exitOnQuit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Goodbye");
    connection.end();
    process.exit(0);
  }
}

const BUY_PRODUCTS_FAIL = "Someting about your request confused me.\nContact your support team.";
function selectProduct() {
    inquirer.prompt(selectProductPrompt).then(answer => {
        exitOnQuit(answer.choice);
        connection.query("SELECT item_id FROM products WHERE ?",
        {
          "item_id" : parseInt(answer.choice)
        },
        (err, res) => {
          if (err) throw err;
          if (res.length == 0) {
            console.log("Invalid item id. :-(  Please try again.");
            listProducts();
          } else {
            selectQuantity(answer.choice)
          }
        });
    });
}

function selectQuantity(itemId) {
  inquirer.prompt(selectQuantityPrompt).then(answer => {
    exitOnQuit(answer.choice);
    let orderQuantity = parseInt(answer.choice)
    fulfillIfInStock(itemId, orderQuantity)
  });
}

function fulfillIfInStock(itemId, orderQuantity) {
    let query = "SELECT stock_quantity, product_name, price FROM products WHERE ?"
    connection.query(
        query, 
        { item_id: parseInt(itemId) },
        (err, res) => {
            if (err) throw err;
            if (res[0].stock_quantity >= orderQuantity) {
                let unitPrice = res[0].price
                fulfillOrder(itemId, orderQuantity, unitPrice)
            } else {
                console.log("Insufficient quantity.")
                listProducts();
            }
        }
    );
}

function fulfillOrder(itemId, itemQnty, unitPrice) {
    const query = `UPDATE products SET stock_quantity = stock_quantity - ${itemQnty} WHERE item_id = ${itemId}`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        let totalCost = (parseFloat(itemQnty) * parseFloat(unitPrice)).toFixed(2);
        console.log("Total cost is $", totalCost);
        listProducts();
    })
}
