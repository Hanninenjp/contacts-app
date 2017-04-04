import { ContactsAppClientPage } from './app.po';

describe('contacts-app-client App', () => {
  let page: ContactsAppClientPage;

  beforeEach(() => {
    page = new ContactsAppClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
