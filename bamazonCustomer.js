var BamazonCustomer = require("./BamazonCustomer-async.js")

// Configure mysql server connection.
const dbConfig = {
  host: "localhost",
  port: 3306,
  database: "bamazon_db",
  user: "root",
  password: ""
}

// Configure user interface prompts for shopping experience.
const ITEM_ID_PROMPT = "Enter the item_id of the product you wish to buy (or Q to quit): "
const ITEM_ID_FAIL_PROMPT = "Please enter a valid item ID. "
const selectProductPrompt = [{
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
}];
const ITEM_QNTY_PROMPT = "How many units would you like to buy (or Q to quit): "
const ITEM_QNTY_FAIL_PROMPT = "Please enter a valid quantity. "
const selectQuantityPrompt = [{
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
}];

// Instantiate a Bamazon session and start shopping.
var customer = new BamazonCustomer(dbConfig, selectProductPrompt, selectQuantityPrompt);
customer.shop();