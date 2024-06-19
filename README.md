# Automated Tests with Selenium

This project demonstrates automated testing using Selenium WebDriver and TypeScript to perform actions on Amazon's website, such as searching for a product, adding it to cart, and proceeding to checkout.

## Project Structure

The project is structured as follows:
scss
project-root/
│
├── src/
│ ├── AmazonTest.ts // Contains the main test class
│ ├── testRunner.ts // Entry point to run the test
│ └── utils.ts // Utility functions for common tasks
│
├── dist/ // Compiled JavaScript files (generated)
│ ├── AmazonTest.js
│ ├── testRunner.js
│ └── utils.js
│
├── node_modules/ // Installed npm packages (generated)
│
├── package.json // Project configuration and dependencies
└── tsconfig.json // TypeScript compiler configuration

## Prerequisites

To run this project, ensure you have the following installed:

- Node.js (with npm)
- TypeScript (`npm install -g typescript`)
- Selenium WebDriver (`npm install selenium-webdriver`)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <https://github.com/pirateking92/basketTest.git>
   cd basketTest
   ```

2. Install dependencies:

```bash
npm install
```

3. Run the tests:
   - using ts-node:

```bash
ts-node src/testRunner.ts
```
