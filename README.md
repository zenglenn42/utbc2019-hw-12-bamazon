# utbc2019-hw-12-bamazon

Console-based version of Amazon ... but with only 9 products. :-)

![alt](docs/img/daniel-eledut-a8KNFpidIPI-unsplash.jpg)

In the beginning, Amazon was all about the books.  In time, they scaled up to sell other things, including the very compute platform
that drives their enterprise.  But behind all the impressive engineering that enables Amazon's current instantiation is a database of products for sale.  Those products have a name, price, and an in-stock quantity.

With this assignment, we take a crack at implementing a bare-bones, database-backed ecommerce application.  Spoiler Alert: No fancy UI on this.  If you look, you'll find the beauty.

When talking about database operations, you often speak of "CRUD" (create, read, update, delete).  These are the classic verbs associated with db interactions.  In our case, we're only implementing "CRU", though.

Here's a sampling of the mysql fu that enables our app:

* Create

	* Creation of the database is bootstrapped through an [sql file](https://github.com/zenglenn42/utbc2019-hw-12-bamazon/blob/fad2ba639bd4adf04808fa0f8d79f455166c13da/bamazonSeed.sql#L1) which must be run out-of-band.
  ```
      % mysql -u root < bamazonSeed.sql
  ```

* Read

	* The list of products is read and displayed with each purchase sequence.
  ```
      connection.query(
        "SELECT * FROM products",
        (err, res) => {
            if (err) throw err;
            console.table(res);
        }
      );
  ```

* Update

	* The stock quantity of a particular item gets decremented as the customer makes purchases.
  ```
      const query = `UPDATE products 
        SET stock_quantity = 
            stock_quantity - ${qnty} 
        WHERE item_id = ${itemId}`;

      connection.query(
        query, 
        (err, res) => {
          if (err) throw err;
          // use results (res) here ...
        }
      );
  ```

* ~Delete~

	* Not a requirement for this assignment.

## Technology stack

* Node.js
* mysql db
* inquirer.js


## Here are the products Bamazon knows about ...

```
mysql> select * from products;
+---------+---------------+-----------------+--------+----------------+
| item_id | product_name  | department_name | price  | stock_quantity |
+---------+---------------+-----------------+--------+----------------+
|       1 | slacks        | mens            |   1.00 |             10 |
|       2 | jeans         | mens            |   2.00 |             20 |
|       3 | chemise       | womens          |   3.00 |             24 |
|       4 | capris        | womens          |   4.00 |             12 |
|       5 | mr. coffee    | household       |   5.00 |              4 |
|       6 | swizzle stick | household       |   2.50 |              2 |
|       7 | milk          | grocery         |   1.50 |             20 |
|       8 | soylent green | grocery         |   3.50 |             15 |
|       9 | Earth         | planet          | 100.00 |              1 |
+---------+---------------+-----------------+--------+----------------+
```

## Here is a typical purchase scenario ...

![alt](docs/img/computer-keyboard-contemporary-electronics-257881.jpg)

```
% node bamazonCustomer.js

Welcome to Bamazon, your complete source for some things.

┌─────────┬─────────┬─────────────────┬─────────────────┬───────┬────────────────┐
│ (index) │ item_id │  product_name   │ department_name │ price │ stock_quantity │
├─────────┼─────────┼─────────────────┼─────────────────┼───────┼────────────────┤
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       10       │
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
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       10       │
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
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       10       │
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

We don't have enough of that product to complete your order.
Please reduce your amount or check back when we have restocked.
Insufficient quantity


┌─────────┬─────────┬─────────────────┬─────────────────┬───────┬────────────────┐
│ (index) │ item_id │  product_name   │ department_name │ price │ stock_quantity │
├─────────┼─────────┼─────────────────┼─────────────────┼───────┼────────────────┤
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       10       │
│    1    │    2    │     'jeans'     │     'mens'      │   2   │       20       │
│    2    │    3    │    'chemise'    │    'womens'     │   3   │       24       │
│    3    │    4    │    'capris'     │    'womens'     │   4   │       12       │
│    4    │    5    │  'mr. coffee'   │   'household'   │   5   │       2        │
│    5    │    6    │ 'swizzle stick' │   'household'   │  2.5  │       2        │
│    6    │    7    │     'milk'      │    'grocery'    │  1.5  │       17       │
│    7    │    8    │ 'soylent green' │    'grocery'    │  3.5  │       15       │
│    8    │    9    │     'Earth'     │    'planet'     │  100  │       1        │
└─────────┴─────────┴─────────────────┴─────────────────┴───────┴────────────────┘
? Enter the item_id of the product you wish to buy (or Q to quit):  10

Invalid item id.
Please try again.



┌─────────┬─────────┬─────────────────┬─────────────────┬───────┬────────────────┐
│ (index) │ item_id │  product_name   │ department_name │ price │ stock_quantity │
├─────────┼─────────┼─────────────────┼─────────────────┼───────┼────────────────┤
│    0    │    1    │    'slacks'     │     'mens'      │   1   │       10       │
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
Thank you for visiting Bamazon

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

### Simple Pseudo Code 🙂
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
function main() {
    console.log("Welcome to Bamazon")
    listProducts()
}
```

and the rest of my logic snakes across callbacks making it less readable:

```
listProducts() {
    queryDB(callback() {
        selectProduct()
        checkValidItem(cb)     // <-- :-/
    })
}

checkValidItem(callback() {
    if (itemInDB(..)) {
        selectQuantity()
        checkValidQuantity(cb) // <-- :-/
    }
})

checkValidQuantity(callback() {
    queryDBforStockQntyCB(cb)  // <-- :-/
})

...
```

### Options

![alt](docs/img/vladislav-babienko-KTpSVEcU0XU-unsplash.jpg)

Fortunately, there are a couple options for addressing this readability issue:

* [async](https://greenleaves-deployed.herokuapp.com/)
* [promise](https://www.npmjs.com/package/promise)

## Async-based Implementation

I'm reading [Marc Wandschneider's book](https://www.amazon.com/Learning-Node-js-Hands-Applications-JavaScript/dp/0134663705/ref=sr_1_1?keywords=node.js+Wandschneider&qid=1571960404&s=books&sr=1-1) on Node.js and he is big on using async
(versus promises) to bring some clarity to the callback-chaining style that Node's
programming model often requires.

![alt](docs/img/mike-lewis-headsmart-media-waAAaeC9hns-unsplash.jpg)

I'm using the 'waterfall' async model in which the results of the upstream callback are passed as parameters to the next downstream callback.  Plus I'm throwing in some object oriented decomposition since it's just the right thing to do.

The overall Bamazon customer class is now looing like this ...

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
  user: "root"
}

// Define inquirer prompt objects here... (exerpted)

// Instantiate a Bamazon session and start shopping.
var customer = new BamazonCustomer(
                    dbConfig, 
                    selectProductPrompt, 
                    selectQuantityPrompt
                  );
customer.shop();
```

## Lessons Learned

![alt](docs/img/allef-vinicius-iNOgTXeT3OM-unsplash.jpg)

### async

After going through this exercise, I'm still a bit on the fence with async.  While I see the
overall callback flow better, there's still some opacity to parameter passing between callbacks.
Some of this is improved by coding up the waterfall methods in the sequence in which they flow.
I guess async is cool.  I'll play with promises in other code to see what I like best.

### i18n

With a bit more effort, we could separate out the messages and error conditions from the
BamazonCustomer class entirely to facilitate internationalization.

### what's with the _method names in the class?

The OO work was fun but I am missing the notion of private or protected methods in JS.  These are internal methods (used by the class itself) that we /don't/ want to expose to users of our class.

I've adopted the convention of prepending an underbar to my [private methods](https://github.com/zenglenn42/utbc2019-hw-12-bamazon/blob/4f33a3820b47b0330e3492b1161deabb073790c3/BamazonCustomer-async.js#L30) (i.e., _privateMethod() {..}) as a clue to consumers of my class not to use those.

### wilding carding in SQL strings

There's a wrinkle worth noting with the mysql npm package.  It supports a wildcarding syntax in the SQL string using '?':
```
    let itemId = 3;
    connection.query(
        "SELECT stock_quantity 
         FROM products 
         WHERE ?",             // <-- :-)
        { item_id: itemId },   // <-- :-)
        (err, res) => {
          if (err) processErr(err);
          if (res[0].stock_quantity < orderQuantity) {
            console.log("Insufficient quantity!");
          }
          ...
        }
    );
```
which is equivalent to:
```
      "SELECT stock_quantity 
       FROM products 
       WHERE item_id = 3"
```
### error handling in callbacks

Error handling fascinates me.  It's a great benchmark by which to measure the sophistication of a body of code.

* Is the code overly optimistic, with no error handling?
* Are try/catch idioms used where appropriate?
* Are the errors annunciated to the user /useful/?
  * Do the messages spell out the implications of the error?
  * Is there any remedial or actionable advice given?

For this application, I added a couple [helper methods](https://github.com/zenglenn42/utbc2019-hw-12-bamazon/blob/4f33a3820b47b0330e3492b1161deabb073790c3/BamazonCustomer-async.js#L57) for reporting and possibly exiting on an error condition.  I also took a page from Marc's thinking with [annunciating errors](https://github.com/zenglenn42/utbc2019-hw-12-bamazon/blob/4f33a3820b47b0330e3492b1161deabb073790c3/BamazonCustomer-async.js#L44) in callbacks since using throw is a bit problematic because the callback executes in it's own context and you won't be able to catch the error from your mainline logic.