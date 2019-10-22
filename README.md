# utbc2019-hw-12-node-mysql

Console-based version of Amazon :-)

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

## Here is a typical MVP purchase scenario ...

```
% node bamazonCustomer.js
Welcome to Bamazon, your complete source for some things

┌─────────┬─────────┬─────────────────┬───────┐
│ (index) │ item_id │  product_name   │ price │
├─────────┼─────────┼─────────────────┼───────┤
│    0    │    1    │    'slacks'     │   1   │
│    1    │    2    │     'jeans'     │   2   │
│    2    │    3    │    'chemise'    │   3   │
│    3    │    4    │    'capris'     │   4   │
│    4    │    5    │  'mr. coffee'   │   5   │
│    5    │    6    │ 'swizzle stick' │  2.5  │
│    6    │    7    │     'milk'      │  1.5  │
│    7    │    8    │ 'soylent green' │  3.5  │
│    8    │    9    │   'computer'    │  10   │
│    9    │   10    │     'phone'     │   9   │
│   10    │   11    │ 'planet earth'  │  100  │
└─────────┴─────────┴─────────────────┴───────┘
? Enter the item_id of the product you wish to buy:  4
? How many units would you like to buy:  2
Placing an order for 2 units of item id 4
Total cost is $ 8
```

## Here's what happens if you attempt to purchase more than what's in stock ...

```
% node bamazonCustomer.js
Welcome to Bamazon, your complete source for some things

┌─────────┬─────────┬─────────────────┬───────┐
│ (index) │ item_id │  product_name   │ price │
├─────────┼─────────┼─────────────────┼───────┤
│    0    │    1    │    'slacks'     │   1   │
│    1    │    2    │     'jeans'     │   2   │
│    2    │    3    │    'chemise'    │   3   │
│    3    │    4    │    'capris'     │   4   │
│    4    │    5    │  'mr. coffee'   │   5   │
│    5    │    6    │ 'swizzle stick' │  2.5  │
│    6    │    7    │     'milk'      │  1.5  │
│    7    │    8    │ 'soylent green' │  3.5  │
│    8    │    9    │   'computer'    │  10   │
│    9    │   10    │     'phone'     │   9   │
│   10    │   11    │ 'planet earth'  │  100  │
└─────────┴─────────┴─────────────────┴───────┘
? Enter the item_id of the product you wish to buy:  4
? How many units would you like to buy:  200
Placing an order for 200 units of item id 4
Insufficient quantity.
```
