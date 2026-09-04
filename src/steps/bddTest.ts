import { test as base } from 'playwright-bdd';
import LibraryBooksPage from '../pages/library/LibraryBooksPage';
import LibraryMembersPage from '../pages/library/LibraryMembersPage';
import LibraryIssuePage from '../pages/library/LibraryIssuePage';
import LibraryReturnPage from '../pages/library/LibraryReturnPage';
import { DataLoader } from '../utils/DataLoader';
import { envConfig, EnvironmentConfig } from '../config/ConfigManager';

/**
 * BDD test object for the Library suite. createBdd() requires a test
 * extended from playwright-bdd's own `test` (not the one in baseTest.ts),
 * so the Library page-object/data fixtures are re-registered here on top
 * of it, following the exact same fixture pattern as baseTest.ts.
 */
export interface ScenarioState {
  isbn?: string;
  bookTitle?: string;
  memberName?: string;
  memberEmail?: string;
  memberRowCountBefore?: number;
  // KAN-19: member search state
  searchMemberName?: string;
  searchMemberEmail?: string;
  otherMemberName?: string;
  otherMemberEmail?: string;
  searchTerm?: string;
}

interface LibraryBddFixtures {
  libraryBooksPage: LibraryBooksPage;
  libraryMembersPage: LibraryMembersPage;
  libraryIssuePage: LibraryIssuePage;
  libraryReturnPage: LibraryReturnPage;
  dataLoader: DataLoader;
  envConfig: EnvironmentConfig;
  state: ScenarioState;
}

export const test = base.extend<LibraryBddFixtures>({
  libraryBooksPage: async ({ page }, use) => {
    await use(new LibraryBooksPage(page));
  },

  libraryMembersPage: async ({ page }, use) => {
    await use(new LibraryMembersPage(page));
  },

  libraryIssuePage: async ({ page }, use) => {
    await use(new LibraryIssuePage(page));
  },

  libraryReturnPage: async ({ page }, use) => {
    await use(new LibraryReturnPage(page));
  },

  dataLoader: async ({}, use) => {
    await use(new DataLoader());
  },

  envConfig: async ({}, use) => {
    await use(envConfig);
  },

  state: async ({}, use) => {
    await use({});
  },
});
