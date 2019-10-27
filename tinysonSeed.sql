DROP DATABASE IF EXISTS tinyson_db;
CREATE DATABASE tinyson_db;
USE tinyson_db;

CREATE TABLE products (
    item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(15) NOT NULL,
    price DEC(7, 2),
    stock_quantity INTEGER NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("slacks", "mens", 1.00, 10),
       ("jeans", "mens", 2.00, 20),
       ("chemise", "womens", 3.00, 24),
       ("capris", "womens", 4.00, 12),
       ("mr. coffee", "household", 5.00, 4),
       ("swizzle stick", "household", 2.50, 2),
       ("milk", "grocery", 1.50, 20),
       ("soylent green", "grocery", 3.50, 15),
       ("Earth", "planet", 100.00, 1)
