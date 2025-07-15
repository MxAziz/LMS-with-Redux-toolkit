# 📚 BookNest – Minimal Library Management System

## 🚀 Project Overview

**BookNest** is a **minimal library management system** built using **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and optionally styled with **Tailwind CSS** or plain CSS. It allows users to manage a collection of books through CRUD operations and enables simple borrowing functionalities.

This project focuses on building a **functional, clean, and responsive client-side application** that interacts with a RESTful API. Authentication, category filters, and payment features are intentionally excluded to keep the project minimal and focused on core logic and UI/UX.

---

## 🧰 Table of Contents

* [Features](#features)
* [Page List](#page-list)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Dependencies](#dependencies)
* [Configuration](#configuration)
* [Examples](#examples)
* [Troubleshooting](#troubleshooting)
* [Contributors](#contributors)
* [License](#license)

---

## ✅ Features

### 1. Public Routes

All features are accessible without login or authentication.

### 2. Book Management

* **Book List Table**

  * View all books with details: Title, Author, Genre, ISBN, Copies, Availability.
* **Actions**

  * **Add New Book**
  * **Edit Book**

    * Business Logic: If copies = 0 → book becomes unavailable.
  * **Delete Book**

    * Confirmation required before deletion.
  * **Borrow Book**

    * Form to borrow book with validation.

### 3. Borrow Book

* Fields: Quantity, Due Date.
* Business Logic:

  * Quantity ≤ Available Copies.
  * If Copies = 0 → mark as unavailable.
* Redirects to **Borrow Summary** after successful submission.

### 4. Borrow Summary

* Aggregated view of all borrowed books.
* Columns: Book Title, ISBN, Total Quantity Borrowed.

### 5. UI Components

* **Navbar**

  * Navigation links to:

    * All Books
    * Add Book
    * Borrow Summary
* **Footer**
* **Responsive Layout**

  * Fully optimized for mobile, tablet, and desktop screens.

---

## 📄 Page List

| Route             | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `/books`          | List of all books with edit, delete, and borrow options |
| `/create-book`    | Form to add a new book                                  |
| `/books/:id`      | View detailed information about a book                  |
| `/edit-book/:id`  | Edit book details                                       |
| `/borrow/:bookId` | Form to borrow a specific book                          |
| `/borrow-summary` | Aggregated summary of borrowed books                    |

---

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MxAziz/LMS-with-Redux-toolkit.git
   cd LMS-with-Redux-toolkit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

> ⚠️ Ensure your backend API is running and accessible.

---

## ▶️ Usage

1. Launch the development server.
2. Navigate to `/books` to browse and manage books.
3. Use `/create-book` to add new entries.
4. Borrow books directly from the list.
5. Visit `/borrow-summary` to see borrowing analytics.

---

## 🗂️ Project Structure (Example)

```
src/
├── app/
├── components/
├── features/
│   ├── books/
│   ├── borrow/
├── pages/
│   ├── BookList.tsx
│   ├── CreateBook.tsx
│   ├── EditBook.tsx
│   ├── BorrowBook.tsx
│   ├── BorrowSummary.tsx
├── services/ (RTK Query APIs)
├── types/
├── utils/
```

---

## 📦 Dependencies

* **React** with **TypeScript**
* **Redux Toolkit Query (RTK Query)**
* **React Router DOM**
* **Tailwind CSS** *(or plain CSS)*
* **React Hook Form** *(for type-safe forms)*

---

## 🧪 Examples

* Add a new book → form auto-clears and redirects to book list.
* Borrowing a book → updates availability in real-time.
* Viewing borrow summary → shows aggregate data from backend.

---

## 🐛 Troubleshooting

| Issue                  | Solution                                           |
| ---------------------- | -------------------------------------------------- |
| API errors             | Check if backend is running and CORS is configured |
| Form validation issues | Ensure correct types and constraints are enforced  |
| UI not updating        | Check Redux state and API response integration     |

---

## 👥 Contributors

* ** Muhammad Aziz ** – Developer & Designer
  *(Feel free to add more team members here)*

---