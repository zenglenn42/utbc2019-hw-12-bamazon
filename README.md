# utbc2019-hw-12-bamazon

![alt](docs/img/daniel-eledut-a8KNFpidIPI-unsplash.jpg)

Console-based version of Amazon-lite :-)

This isn't a full CRUD application (Create, Read, Update, Delete).  
Maybe CRU at best ...

* Create

	* Creation of the database is bootstrapped through an [*.sql file](https://github.com/zenglenn42/utbc2019-hw-12-bamazon/blob/fad2ba639bd4adf04808fa0f8d79f455166c13da/bamazonSeed.sql#L1) which must be run out-of-band.

* Read

	* The list of products is read and displayed with each purchase sequence.

* Update

	* The stock quantity of a particular item gets decremented as the customer makes purchases.

* ~Delete~

	* Not implemented.  Not a requirement for this assignment.


## Technology stack

* node.js
* mysql db
* inquirer.js


## Here are the products Bamazon knows about ...

```
mysql> select * from products;
+---------+---------------+-----------------+-------+----------------+
| item_id | product_name  | department_name | price | stock_quantity |
+---------+---------------+-----------------+-------+----------------+
|       1 | slacks        | mens            |  1.00 |             10 |
|       2 | jeans         | mens            |  2.00 |             20 |
|       3 | chemise       | womens          |  3.00 |             24 |
|       4 | capris        | womens          |  4.00 |             12 |
|       5 | mr. coffee    | household       |  5.00 |              4 |
|       6 | swizzle stick | household       |  2.50 |              2 |
|       7 | milk          | grocery         |  1.50 |             20 |
|       8 | soylent green | grocery         |  3.50 |             15 |
|       9 | computer      | electronics     | 10.00 |              9 |
|      10 | phone         | electronics     |  9.00 |              4 |
+---------+---------------+-----------------+-------+----------------+
```

## Here is a typical purchase scenario ...

![alt](docs/img/computer-keyboard-contemporary-electronics-257881.jpg)

```
% node bamazonCustomer.js

Welcome to Bamazon, your complete source for certain things!

┌─────────┬─────────┬─────────────────┬─────────────────┬───────┬────────────────┐
│ (index) │ item_id │  product_name   │ department_name │ price │ stock_quantity │
├─────────┼─────────┼─────────────────┼─────────────────┼───────┼────────────────┤
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       8        │
│    1    │    2    │     'jeans'     │     'mens'      │   2   │       20       │
│    2    │    3    │    'chemise'    │    'womens'     │   3   │       24       │
│    3    │    4    │    'capris'     │    'womens'     │   4   │       12       │
│    4    │    5    │  'mr. coffee'   │   'household'   │   5   │       4        │
│    5    │    6    │ 'swizzle stick' │   'household'   │  2.5  │       2        │
│    6    │    7    │     'milk'      │    'grocery'    │  1.5  │       20       │
│    7    │    8    │ 'soylent green' │    'grocery'    │  3.5  │       15       │
│    8    │    9    │     'Earth'     │    'planet'     │  100  │       1        │
└─────────┴─────────┴─────────────────┴─────────────────┴───────┴────────────────┘
? Enter the item_id of the product you wish to buy (or Q to quit):  5
? How many units would you like to buy (or Q to quit):  2
Total cost is $ 10.00

┌─────────┬─────────┬─────────────────┬─────────────────┬───────┬────────────────┐
│ (index) │ item_id │  product_name   │ department_name │ price │ stock_quantity │
├─────────┼─────────┼─────────────────┼─────────────────┼───────┼────────────────┤
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       8        │
│    1    │    2    │     'jeans'     │     'mens'      │   2   │       20       │
│    2    │    3    │    'chemise'    │    'womens'     │   3   │       24       │
│    3    │    4    │    'capris'     │    'womens'     │   4   │       12       │
│    4    │    5    │  'mr. coffee'   │   'household'   │   5   │       2        │
│    5    │    6    │ 'swizzle stick' │   'household'   │  2.5  │       2        │
│    6    │    7    │     'milk'      │    'grocery'    │  1.5  │       20       │
│    7    │    8    │ 'soylent green' │    'grocery'    │  3.5  │       15       │
│    8    │    9    │     'Earth'     │    'planet'     │  100  │       1        │
└─────────┴─────────┴─────────────────┴─────────────────┴───────┴────────────────┘
? Enter the item_id of the product you wish to buy (or Q to quit):  7
? How many units would you like to buy (or Q to quit):  3
Total cost is $ 4.50

┌─────────┬─────────┬─────────────────┬─────────────────┬───────┬────────────────┐
│ (index) │ item_id │  product_name   │ department_name │ price │ stock_quantity │
├─────────┼─────────┼─────────────────┼─────────────────┼───────┼────────────────┤
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       8        │
│    1    │    2    │     'jeans'     │     'mens'      │   2   │       20       │
│    2    │    3    │    'chemise'    │    'womens'     │   3   │       24       │
│    3    │    4    │    'capris'     │    'womens'     │   4   │       12       │
│    4    │    5    │  'mr. coffee'   │   'household'   │   5   │       2        │
│    5    │    6    │ 'swizzle stick' │   'household'   │  2.5  │       2        │
│    6    │    7    │     'milk'      │    'grocery'    │  1.5  │       17       │
│    7    │    8    │ 'soylent green' │    'grocery'    │  3.5  │       15       │
│    8    │    9    │     'Earth'     │    'planet'     │  100  │       1        │
└─────────┴─────────┴─────────────────┴─────────────────┴───────┴────────────────┘
? Enter the item_id of the product you wish to buy (or Q to quit):  9
? How many units would you like to buy (or Q to quit):  2
Insufficient quantity.

┌─────────┬─────────┬─────────────────┬─────────────────┬───────┬────────────────┐
│ (index) │ item_id │  product_name   │ department_name │ price │ stock_quantity │
├─────────┼─────────┼─────────────────┼─────────────────┼───────┼────────────────┤
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       8        │
│    1    │    2    │     'jeans'     │     'mens'      │   2   │       20       │
│    2    │    3    │    'chemise'    │    'womens'     │   3   │       24       │
│    3    │    4    │    'capris'     │    'womens'     │   4   │       12       │
│    4    │    5    │  'mr. coffee'   │   'household'   │   5   │       2        │
│    5    │    6    │ 'swizzle stick' │   'household'   │  2.5  │       2        │
│    6    │    7    │     'milk'      │    'grocery'    │  1.5  │       17       │
│    7    │    8    │ 'soylent green' │    'grocery'    │  3.5  │       15       │
│    8    │    9    │     'Earth'     │    'planet'     │  100  │       1        │
└─────────┴─────────┴─────────────────┴─────────────────┴───────┴────────────────┘
? Enter the item_id of the product you wish to buy (or Q to quit):  q
Goodbye
```

Of course the beauty of this application isn't in the frontend .... it's in the backend where we get intimations of how to connect to a database and perform some basic queries and updates.  In later assignments, we'll add an Express server and wrapper our database interactions in an Object Relational Mapping (ORM) like Sequelize where we can use Promise-based idioms to improve the readability of our code.

![alt](docs/img/database.png)

## Designer's Blog

Ah, Node.js.  

I love the performance of your non-blocking, [asynchronous programming model](https://mindmajix.com/node-js/what-is-node-js).

If I need something from you that would normally block on i/o, I just ...

* make the request, passing you a callback function  
* time passes, other requests queue-up efficiently
* when node has what I need, you invoke my callback with the results I want 
* and my program logic continues

You process a lot of stuff because my thread is not camped out in the foreground waiting.

But you make my code difficult to read ... since my program logic snakes across callbacks.

For the Bamazon application, the pseudo code is simple enough:

### Simple Pseudo Code 😊
```
while still shopping
do
    list products in store db
    prompt user for item to buy or quit shopping
        if valid item
            prompt user for quantity to buy or quit shopping
                if valid quantity
                    place order, updating stock quantity in db
                    calculate and display order cost
                else
                    display error message "insufficient quantity"
                endif
        else
            display error "invalid item"
        endif
done
```	

But because of the callback model, the actual code flows across my screen in this
disjoint way. 

### Ugly Actual-ish Code 🙁

```
main() {
    console.log("Welcome to Bamazon")
    listProducts()
}
```

and the rest of my logic snakes across callbacks making it less readable:

```
listProducts() {
    queryDB(callback() {
        selectProduct()
        checkValidItem(cb)     // <--
    })
}

checkValidItem(callback() {
    if valid item {
        selectQuantity()
        checkValidQuantity(cb) // <--
    }
})

checkValidQuantity(callback() {
    if valid quantity
        fulfillOrder({
            calculate and display order cost
            listProducts()
        })
    else
        display error message "insufficient quantity"
        listProducts()
})
```

### Options

![alt](docs/img/vladislav-babienko-KTpSVEcU0XU-unsplash.jpg)

Fortunately, there are a couple options for addressing this readability issue:

* [async](https://greenleaves-deployed.herokuapp.com/)
* [promise](https://www.npmjs.com/package/promise)

## Async-based Implementation

I'm reading Marc Wandschneider's book on Node.js and he is big on using the 'async'
(versus promises) to bring some clarity to the callback-chaining style that Node's
programming model often requires.

![alt](docs/img/mike-lewis-headsmart-media-waAAaeC9hns-unsplash.jpg)

I'm using the 'waterfall' async model plus throwing in some object oriented decomposition.

The overall Bamazon customer class looks like this ...

```
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
    async.waterfall([                     // <-- The new hotness :-)
        this._listProducts.bind(this),    //
        this._selectProduct.bind(this),   // Presumably this is more readable because you can see
        this._selectQuantity.bind(this),  // how the (asynchronous) steps in the chain flow from
        this._checkInStock.bind(this),    // one callback into another.
        this._fulfillOrder.bind(this)     // 
      ],                                  // The coding style is a tad idiosyncratic.
      (err, results) => {
        callback(err, results);
      });
  }
 
  ...
}
```

The driver to kick off a shopping sequence is simple with our OO decomposition:

```
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
```

After going through this exercise, I'm still a bit on the fence with async.  While I see the
overall callback flow better, there's still some opacity to parameter passing between callbacks.
Some of this is improved by coding up the waterfall methods in the sequence in which they flow.
I guess async is cool.  I'll play with promises in other code to see what I like best.

Also, with a bit more effort, we could separate out the messages and error conditions from the
BamazonCustomer class entirely to facilitate internationalization.

The OO work was fun but I am missing the notion of private or protected methods in JS.  I've adopted
the convention of prepending an underbar to my private methods (i.e., _privateMethod() {..}) as
a clue to consumers of my class /not/ to use those.
