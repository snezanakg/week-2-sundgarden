
# Week 10 – Sequelize Answers

## Skill 1: Understand the ORM

### 2. What does ORM stand for?


ORM stands for Object-Relational Mapping.

The "object" part refers to JavaScript objects that we
use in our application, such as a Book object with a
title, genre, and published year.

The "relational" part refers to the PostgreSQL database,
where information is stored in tables with rows and columns.

ORM connects these two, so we can work with database
records using JavaScript instead of writing SQL manually.


### 3. What SQL does Sequelize generate?

Book.findAll() gets all books from the database.

SQL:
```sql
SELECT * FROM books;
```

Book.findByPk(3) finds one book using its primary key,
which is the ID in our database.

SQL:
```sql
SELECT * FROM books WHERE id = 3;
```

Both methods let us get data from PostgreSQL without
writing SQL queries manually in our JavaScript code.

### 4. What do host, port, dialect, and logging do?

When we connect Sequelize to PostgreSQL, we need
to provide some connection settings.

- **host:** Tells Sequelize where the database server
  is located. For example, localhost means the database
  is accessible from our computer.

- **port:** Tells Sequelize which network port to use
  to connect to PostgreSQL, usually 5432.

- **dialect:** Tells Sequelize which type of database
  we are using. In our project, it is "postgres".

- **logging:** Controls whether Sequelize prints the
  SQL queries it generates in the terminal. This helps
  us understand and debug our queries.

These settings help Sequelize connect to the correct
database and communicate with it.

### 5. What does sequelize.sync() do?

sequelize.sync() checks if the database tables defined
by our Sequelize models exist. If a table is missing,
Sequelize creates it automatically.

It does not normally change tables that already exist.

sequelize.sync({ force: true }) is different because
it deletes and recreates the tables.

We should never use force: true on a production database
because it can permanently delete important data,
such as books, authors, and loan records.

In our Library project, we should use the normal
sync() method to avoid losing existing data.

### 6. When is plain SQL better than using an ORM?

Plain SQL can be better when we need complex queries
with many joins, calculations, or large amounts of data.

It gives us more control over how the database works
and can sometimes be faster for complicated queries.

For example, if our Library API needs a detailed report
showing the most borrowed books and their authors,
writing SQL directly might be easier and more efficient.

Sequelize is useful for common operations like creating,
reading, updating, and deleting records.

I would use Sequelize for everyday database operations
and plain SQL when I need more control over a query.


### 1. What does Sequelize translate?

Sequelize is like a translator between JavaScript and
the SQL database. Instead of writing SQL queries manually,
we use JavaScript methods such as findAll() or create().
Sequelize translates these instructions into SQL queries
that PostgreSQL understands. It also helps turn database
results into JavaScript objects.
