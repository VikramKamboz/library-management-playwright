import { Page, Locator, expect } from '@playwright/test';
import LibraryBasePage from './LibraryBasePage';
import { libraryBooksLocators } from '../locators/library/libraryBooksLocators';

export default class LibraryBooksPage extends LibraryBasePage {
  private readonly titleInput: Locator;
  private readonly authorInput: Locator;
  private readonly isbnInput: Locator;
  private readonly addBookButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput = this.page.locator(libraryBooksLocators.titleInput);
    this.authorInput = this.page.locator(libraryBooksLocators.authorInput);
    this.isbnInput = this.page.locator(libraryBooksLocators.isbnInput);
    this.addBookButton = this.page.locator(libraryBooksLocators.addBookButton);
    this.errorMessage = this.page.locator(libraryBooksLocators.errorMessage);
  }

  async open(): Promise<void> {
    await this.openTab(libraryBooksLocators.booksTab);
  }

  async addBook(title: string, author: string, isbn: string): Promise<void> {
    await this.fill(this.titleInput, title);
    await this.fill(this.authorInput, author);
    await this.fill(this.isbnInput, isbn);
    await this.click(this.addBookButton);
  }

  async expectDuplicateIsbnError(): Promise<void> {
    await this.waitForELement(this.errorMessage);
    await expect(this.errorMessage).toHaveText('A book with this ISBN already exists.');
  }

  async expectBookAddedSuccessfully(isbn: string): Promise<void> {
    const bookRow = this.page.locator(libraryBooksLocators.booksListRows).filter({ hasText: isbn });
    await expect(bookRow).toBeVisible();
  }

  async countBookRows(isbn: string): Promise<number> {
    return this.page.locator(libraryBooksLocators.booksListRows).filter({ hasText: isbn }).count();
  }
}
