import { ThaitrainerPage } from './app.po';

describe('thaitrainer App', () => {
  let page: ThaitrainerPage;

  beforeEach(() => {
    page = new ThaitrainerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
