# Book Library Project

## Description

This project is a simple web-based book library application built using React. It allows users to browse, view, and add books to a library. The app includes functionality for filtering books by category, searching for books by title or author, viewing detailed book information, and adding new books to the library with proper validation.

## Features

### 1. **Home Page**

- A landing page with a welcome message.
- A list of book categories (e.g., Fiction, Non-Fiction, Sci-Fi, etc.).
- Display a list of popular books with links to view more details.
- A navigation bar with links to "Home", "Browse Books", and "Add Book".

### 2. **Browse Books Page**

- Display a list of books filtered by category.
- Dynamic routing to filter books by category (e.g., `/books/:category`).
- Each book has a "View Details" link that navigates to the Book Details page.
- A search bar to filter books by title or author.

### 3. **Book Details Page**

- A dynamic route that displays detailed information about a selected book.
- Displays the book’s title, author, description, and rating.
- A "Back to Browse" button or link to return to the Browse Books page.

### 4. **Add Book Page**

- A form to add a new book to the library.
- Uses Redux to manage the state of the books list.
- After submission, redirects to the Browse Books page with the newly added book displayed.
- Implements form validation to ensure all fields are correctly filled out.

### 5. **404 Page**

- A "Page Not Found" route for any undefined routes.
- Includes a link back to the Home page.

## Requirements

- **React** (>= 18.3.1)
- **Redux** (>= 5.0.1)
- **React Router** (>= 6.28.0)
- **Axios** (>= 1.7.7)
- **Redux DevTools Extension** (>= 3.3.0)
- **Redux Toolkit** (>= 2.3.0)
- **React Redux** (>= 9.1.2)
- **React Scripts** (>= 5.0.1)
- **Redux Logger** (>= 3.0.6)
- **Redux Persist** (>= 6.0.0)
- **Redux Thunk** (>= 3.1.0)
- **Font Awesome** (>= 6.6.0)
- **Testing Libraries**:
  - **@testing-library/jest-dom** (>= 5.17.0)
  - **@testing-library/react** (>= 13.4.0)
  - **@testing-library/user-event** (>= 13.5.0)
- **Web Vitals** (>= 2.1.4)
- **Buffer** (>= 6.0.3)

## Installation

To run the project locally, follow these steps:

### 1. Clone the Repository

Clone the repository to your local machine using Git. Open your terminal and run:

```bash
git clone https://github.com/ufrhub/OnlineLibrary.git

