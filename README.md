# Week 9 – MongoDB Library API

For this assignment, I rebuilt a small library API with Express, MongoDB and Mongoose. I used Docker for the database and Insomnia to test the routes.

## Run locally

1. Run `npm install`.
2. Create `.env` using `.env.example` and set your own credentials.
3. Run `docker compose up -d`.
4. Run `npm run dev`.

The API runs at `http://localhost:3000`.

## Features

Book CRUD, schema validation, filtering and sorting. Books can also reference authors, and `populate()` returns the author details.

## Insomnia tests

<details>
<summary>View my screenshots</summary>

### Books and error handling

![Get all books](screenshots/01-get-books.png)
![Create a book](screenshots/02-post-book.png)
![Get book by ID](screenshots/03-get-book-by-id.png)
![Update a book](screenshots/04-update-book.png)
![Delete a book](screenshots/05-delete-book.png)
![Invalid book ID](screenshots/06-invalid-book-id.png)
![Book not found](screenshots/07-book-not-found.png)

### Validation and queries

![Missing title validation](screenshots/08-missing-title.png)
![Invalid genre validation](screenshots/09-invalid-genre.png)
![Invalid year validation](screenshots/10-invalid-year.png)
![Filter books by genre](screenshots/11-filter-genre.png)
![Sort books by year](screenshots/12-sort-books.png)
![Add another book for testing](screenshots/13-add-book.png)

### Authors

![Create an author](screenshots/14-create-author.png)
![Get all authors](screenshots/15-get-authors.png)
![Books with populated author details](screenshots/16-books-with-authors.png)
![Get books by author](screenshots/17-author-books.png)
      



      created by: Snezana Kragujevac