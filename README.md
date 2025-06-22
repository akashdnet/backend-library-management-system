# Library Management System API

Welcome to the Backend Library Management System. This backend project helps to manage library books and borrowing records. It’s built using Node.js, Express, and MongoDB, with TypeScript for better structure and easier maintenance.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Book Management](#book-management)
  - [Borrow Management](#borrow-management)
- [Technologies Used](#technologies-used)

## Features

- **CRUD ops on Books Records:** Create, read, update, and delete books.
- **Borrowing System:** Borrow functionality.
- **Data Validation:** Schema-level validation using Mongoose with mongoose middleware.
- **Advanced Error Handling:** Global error handler with meaning full error message.
- **Mongoose Middleware:** Use of `pre` and `post` hooks.
- **Type Safety:** Written entirely in TypeScript for a more robust and maintainable codebase.

## Project Structure

The project follows a modular, feature-based architecture:

```
src/
├── app/
│   ├── modules/
│   │   ├── Book/
|   |   |   ├── book.controller.ts    
|   |   |   ├── book.interface.ts
|   |   |   ├── book.model.ts
|   |   |   ├── book.route.ts
│   │   |── Borrow/
|   |   |   ├── borrow.controller.ts    
|   |   |   ├── borrow.interface.ts
|   |   |   ├── borrow.model.ts
|   |   |   ├── borrow.route.ts
|   ├── config/
|       ├── index.ts
|   ├── middlewares/
|       ├── GenericError.ts
|       ├── globalErrorHandler.ts
|       ├── notFound.ts
├── app.ts
└── server.ts
```

## Prerequisites

Make sure to following these installion:
- [Node.js](https://nodejs.org/) (v22.15.0 or higher)
- [MongoDB](https://www.mongodb.com/) (For running locally or a cloud instance)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/akashdnet/backend-library-management-system.git

    cd backend-library-management-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of this project. See the [Environment Variables](#environment-variables) section for the required variables.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```





## Environment Variables

Create a `.env` file in the project's root directory and add these following configurations:

```env
# The port the server will run on
PORT=5000

# Your MongoDB connection string
DATABASE_URL=YourDatabaseURI
```

## API Endpoints

All endpoints are prefixed with `/api`.



## Book Management

#### 1. Create a New Book
- **Endpoint:** `POST /api/books`
- **Description:** Add a new book.
- **Input Fields:**
  - `title` (String, Required)
  - `author` (String, Required)
  - `genre` (String, Required) - Must be one of: `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`.
  - `isbn` (String, Required, Unique)
  - `copies` (Number, Required, Min: 0)
  - `description` (String, Optional)
- **Request Body (JSON):**
  ```json
  {
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "genre": "FANTASY",
    "isbn": "9680618640157",
    "copies": 5,
    "description": "The epic tale of the War of the Ring."
  }
  ```


#### 2. Get All Books
- **Endpoint:** `GET /api/books`
- **Description:** Retrieves all books.
- **Query Parameters (Optional):**
  - `filter`: Filter by genre (e.g., `?filter=SCIENCE`).
  - `sortBy`: Field to sort by (e.g., `createdAt`).
  - `sort`: Sort order, `asc` or `desc` (e.g., `&sort=desc`).
  - `limit`: Number of results to return (default: 10, e.g., `&limit=5`).
- **Example Usage:** `GET /api/books?filter=FANTASY&sortBy=title&sort=asc`

#### 3. Get a Single Book
- **Endpoint:** `GET /api/books/:bookId`
- **Description:** Retrieve specific book by `_id`.
- **Parameter:**
  - `bookId` (ObjectId, Required) - ID of book from reacods.
- **Example Usage:** `GET /api/books/685718fdd0fa7375dc7ac75c`

#### 4. Update a Book
- **Endpoint:** `PUT /api/books/:bookId`
- **Description:** Update information of an existing book.Any field can be updated.
- **Request Body (JSON):**
  ```json
  {
    "copies": 8,
    "description": "Updated description."
  }
  ```

#### 5. Delete a Book
- **Endpoint:** `DELETE /api/books/:bookId`
- **Description:** Delete book by ID.

---

### Borrow Management

#### 1. Borrow a Book
- **Endpoint:** `POST /api/borrow`
- **Description:** Create new borrow record.
- **Input Fields:**
  - `book` (ObjectId, Required) - ID of book that want to borrow.
  - `quantity` (Number, Required, Min: 1) - Book quantity.
  - `dueDate` (Date, Required) - How much time need!
- **Request Body (JSON):**
  ```json
  {
    "book": "685718fdd0fa7375dc7ac75c",
    "quantity": 1,
    "dueDate": "2025-01-15T00:00:00.000Z"
  }
  ```


#### 2. Get Borrowed Books Summary
- **Endpoint:** `GET /api/borrow`
- **Description:** Return a summary of borrowed books, including: Total borrowed quantity per book (totalQuantity). Book details: title and isbn
- **Response Structure (Example):**
  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Lord of the Rings",
          "isbn": "9780618640157"
        },
        "totalQuantity": 5
      },
      { ... }
    ]
  }
  ```

---


## Technologies Used

This project is built using the following technologies and libraries:

-   **Backend:** Node.js, Express.js
-   **Language:** TypeScript
-   **Database:** MongoDB with Mongoose
-   **Environment Variables:** `dotenv`
-   **CORS:** `cors`

