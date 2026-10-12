# Week 9 – SQL Injection Homework

## Lab 1 – Retrieve Hidden Data


**Payload:** `Gifts' OR 1=1--`

**SQL query produced (approximate):**

SELECT * FROM products
WHERE category = 'Gifts' OR 1=1--' AND released = 1;

**Why it worked:**
The single quote closes the category string. OR 1=1 makes the condition always true, and -- comments out the remaining SQL, including the restriction on unreleased products.

**Result:** Lab solved successfully.

## Lab 2 – Login Bypass

**Payload:**

**SQL query produced:**

**Why it worked:**

## Lab 3 – UNION: Retrieve Data from Other Tables

**Payload:**

**SQL query produced:**

**Why it worked:**

## Lab 4 – Determine the Number of Columns

**Payload:**

**SQL query produced:**

**Why it worked:**

## Lab 5 – Find a Column Containing Text

**Payload:**

**SQL query produced:**

**Why it worked:**

## Lab 6 – Retrieve Multiple Values in One Column

**Payload:**

**SQL query produced:**

**Why it worked:**