import { GqlClientPage } from './app.po';

describe('gql-client App', function() {
  let page: GqlClientPage;

  beforeEach(() => {
    page = new GqlClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
