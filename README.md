# Payslip Calculator

It is a payslip calculator built with React-Redux-Node.js starter kit. It has easy to use UI, form validations for input data and thorough tests. 

## Requirements
* node `^5.0.0`
* yarn `^0.23.0` or npm `^3.0.0`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project by doing the following:

```bash
$ git clone https://github.com/jeffyyyy/Salary-Calculator.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ yarn start  # Start the development server (or `npm start`)
```

Now open your browser and enter address http://localhost:3000/, you will see the UI for the calculator

```bash
$ yarn test  # Run tests
```

Run all tests under folder tests, including Redux actions/reducers, back-end unit tests.

## Project Structure

```
.
├── build                    # All build-related code
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── normalize.js         # Browser normalization and polyfills
│   ├── helpers              # Helper methods
│   ├── layouts              # Components that dictate major page structure
│   │   └── PageLayout       # Global application layout in which to render routes
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   └── Calculator       # Fractal route for Payslip Calculator
│   │       ├── index.js     # Calculator route definition
│   │       ├── components   # Presentational React Components
│   │       ├── container    # Connect components to actions and store
│   │       ├── actions      # Collections of actions
│   │       ├── reducers     # Collections of reducers
│   │       ├── constants    # Collections of constants
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Redux Actions, Reducers tests, Backend API unit tests
```

## Further improvements (incoming...)
1. query caching


