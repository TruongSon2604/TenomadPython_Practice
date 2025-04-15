import { apiDelete, apiGet, apiPost, apiPut } from "./apiService";

// Mock data for books
const BOOKS_STORAGE_KEY = "books";

// Initial sample data
const initialBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    publishedYear: 1960,
    description:
      "A novel about a young girl growing up in a town where her father, a lawyer, defends a black man accused of raping a white woman.",
    coverImage:
      "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    publishedYear: 1949,
    description:
      "A dystopian novel set in Airstrip One, a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance, and public manipulation.",
    coverImage:
      "https://m.media-amazon.com/images/I/519zR2oIlmL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publishedYear: 1925,
    description:
      "The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan.",
    coverImage:
      "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
  },
];

// Initialize localStorage with sample data if it doesn't exist
const initializeBooks = () => {
  const storedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);
  if (!storedBooks) {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  }
  return JSON.parse(storedBooks);
};

// Get all books
export const getBooks = async () => {
  const books = await apiGet("/books");
  if (books.success) {
    return books.data;
  }
  return initializeBooks();
};

// Get a single book by ID
export const getBookById = async (id) => {
  const books = await apiGet(`/books/${id}`);
  console.log(books.data);
  return books.data || null;
};

// Create a new book
export const createBook = async (bookData) => {
  const books = await apiPost(`/books`, bookData);
  if (books.success) {
    alert("add book successfull ");
  }
  return books.data || null;
};

// Update an existing book
export const updateBook = async (id, bookData) => {
  const books = await apiPut(`/books/${id}`, bookData);
  if (books.success) {
    alert("Update book successfull ");
  }
  return books.data || null;
};

// Delete a book
export const deleteBook = async (id) => {
  const books = await apiDelete(`/books/${id}`);
  if (books.success) {
    alert("delete book successfull ");
  }
  return books.data || null;
};

// Search books by title or author
export const searchBooks = (query) => {
  if (!query) {
    return getBooks();
  }

  const books = getBooks();
  const lowercaseQuery = query.toLowerCase();

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery)
  );
};
