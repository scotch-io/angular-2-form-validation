import { Ng2formsPage } from './app.po';

describe('ng2forms App', function() {
  let page: Ng2formsPage;

  beforeEach(() => {
    page = new Ng2formsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
