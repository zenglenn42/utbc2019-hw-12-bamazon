# utbc2019-hw-12-bamazon

Console-based version of Amazon-lite :-)

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
