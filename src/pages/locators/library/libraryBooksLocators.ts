/**
 * Centralized selectors for the Library app's Books tab.
 * Verified against the running app at http://localhost:5050.
 */
export const libraryBooksLocators = {
  booksTab: '.tab-btn[data-tab="books"]',
  titleInput: '#book-title',
  authorInput: '#book-author',
  isbnInput: '#book-isbn',
  addBookButton: '#add-book-form button[type="submit"]',
  errorMessage: '#book-error',
  booksList: '#books-list',
  booksListRows: '#books-list tbody tr',
};
