# utbc2019-hw-12-bamazon

Console-based version of Amazon-lite :-)

This isn't a full CRUD application (Create, Read, Update, Delete).  
Maybe CRU at best ...

Creation

* Creation of the database is bootstrapped through an *.sql file which must be run out-of-band.

Read

* The list of products is read and displayed with each purchase sequence.

Update

* The stock quantity of a particular item gets decremented as the customer makes purchases.

Delete

* Not implemented.  Not a requirement for this assignment.


## Technology stack

* node.js
* mysql
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

```
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

## Designer's Blog

Ah, Node.js.  

I love the performance of your non-blocking, asynchronous programming model.

If I need something from you that would normally block, I just ...

* make the request, passing you a callback function  
* time passes, meanwhile while other requests efficiently queue up and get processed
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

### Ugly Actual Code 🙁

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

Fortunately, there are a couple options for addressing this readability issue:

* [async](https://greenleaves-deployed.herokuapp.com/)
* [promise](https://www.npmjs.com/package/promise)

In the fullness of time, I may retrofit my code with this fu.
