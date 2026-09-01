import { Page, Locator, expect } from '@playwright/test';
import LibraryBasePage from './LibraryBasePage';
import { libraryMembersLocators } from '../locators/library/libraryMembersLocators';

export default class LibraryMembersPage extends LibraryBasePage {
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly addMemberButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = this.page.locator(libraryMembersLocators.nameInput);
    this.emailInput = this.page.locator(libraryMembersLocators.emailInput);
    this.addMemberButton = this.page.locator(libraryMembersLocators.addMemberButton);
    this.errorMessage = this.page.locator(libraryMembersLocators.errorMessage);
  }

  async open(): Promise<void> {
    await this.openTab(libraryMembersLocators.membersTab);
  }

  async addMember(name: string, email: string): Promise<void> {
    await this.fill(this.nameInput, name);
    await this.fill(this.emailInput, email);
    await this.click(this.addMemberButton);
  }

  async expectInvalidEmailError(expectedMessage: string = 'Invalid email format.'): Promise<void> {
    await this.waitForELement(this.errorMessage);
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  async expectMemberAddedSuccessfully(email: string): Promise<void> {
    const memberRow = this.page.locator(libraryMembersLocators.membersListRows).filter({ hasText: email });
    await expect(memberRow).toBeVisible();
  }

  async countAllMemberRows(): Promise<number> {
    return this.page.locator(libraryMembersLocators.membersListRows).count();
  }
}
