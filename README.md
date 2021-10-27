# Nasdaq Stocks

A stock market web app that shows all stocks listed in Nasdaq exchange with their ticker, name, and details using [Polygon](https://polygon.io/docs) API.

This was a take home assignment i did for an interview with [Thndr](https://thndr.app).

**Git branches:**

There are two implementations for server-state management and caching

- [Main branch](https://github.com/A-Maged/Nasdaq-Stocks) uses "React-Query" & is deployed to [here](https://nasdaq-stocks.netlify.app)
- [Overmind branch](https://github.com/A-Maged/Nasdaq-Stocks/tree/overmind) uses "Overmind" & is deployed to [here](https://overmind-nasdaq-stocks.netlify.app/)

## Contents

- [Features](#features)
- [Run Locally](#run-locally)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)

## Features

- Browse stocks listed in Nasdaq exchange with their ticker and full name.
- Load more stocks by scrolling through the screen.
- Search for a stock.
- See stock details.

## Run Locally

1. Create environment file

```bash
  cp .env.example .env
```

2. Sign up for an API key at [Polygon](https://polygon.io)

3. Add API key to `REACT_APP_API_KEY` in .env file

4. Install dependencies:

```bash
  npm install
```

5. Start application:

```bash
  npm start
```

## Scripts

Install dependencies

```bash
  npm install
```

Start application

```bash
  npm start
```

Run tests

```bash
  npm run test
```

Watch tests

```bash
  npm run test:watch
```

Run cypress

```bash
  npm run cypress:open
```

Fix linting errors

```bash
  npm run lint:fix
```

## Tech Stack

**Language:** [Typescript](https://www.typescriptlang.org/)

**UI Library:** [React](https://reactjs.org/)

**UI Framework:** [Chakra-UI](https://chakra-ui.com/)

**Server-State Manager:** [React-Query](https://react-query.tanstack.com/) & [Overmind](https://overmindjs.org/)

**Testing:**

- [Cypress](https://www.cypress.io)
- [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro)
- [Jest](https://jestjs.io)

**Build:**

- [Create-React-App](https://create-react-app.dev)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Husky](https://github.com/typicode/husky)

**Misc:**

- [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component)
- [Axios](https://github.com/axios/axios)
- [Date-Fns](https://date-fns.org)
