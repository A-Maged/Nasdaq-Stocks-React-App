const selectors = {
  searchInput: 'input[name="search-stocks"]',
  listSpinner: '[data-testid=list-spinner]',
  ticker: '[data-testid="stock-ticker"]',
  stockCompanyName: '[data-testid="stock-company-name"]',
};

describe('/explore', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        hostname: 'api.polygon.io',
        pathname: '/v3/reference/tickers',
        query: {
          search: '',
        },
      },
      {
        delay: 10,
        fixture: 'listTickers.json',
      }
    ).as('listTickers');

    cy.visit('/explore');
  });

  it('show search input and load a list of tickers', () => {
    cy.get(selectors.listSpinner);
    cy.get(selectors.searchInput);

    cy.wait('@listTickers');

    cy.get(selectors.ticker);
    cy.get(selectors.stockCompanyName).should('have.length.above', 1);
  });

  it('loads more tickers on scroll', () => {
    cy.scrollTo('bottom');

    cy.wait('@listTickers');

    cy.get(selectors.ticker).should('have.length.above', 100);
  });

  it('search with ticker', () => {
    const ticker = 'AAPL';

    cy.intercept(
      {
        method: 'GET',
        hostname: 'api.polygon.io',
        pathname: '/v3/reference/tickers',
        query: {
          search: ticker,
        },
      },
      {
        delay: 10,
        fixture: 'searchTickers.json',
      }
    ).as('searchTickers');

    cy.get(selectors.searchInput).type(ticker);

    cy.wait('@searchTickers');

    cy.get(selectors.ticker).first().contains(ticker);
  });
});
