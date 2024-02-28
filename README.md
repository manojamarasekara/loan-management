Interview Offline Exercise - Manoj

# Loan Management System

This program is a simple loan management system implemented in Node.js. It allows users to create loans, make payments, and check balances.

## Prerequisites

- Node.js installed on your machine.

## How to Setup and Start

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/manojamarasekara/loan-management.git
    ```

2. Navigate to the project directory:

   ```
   cd loan-management
   ```

3. Install dependencies:

    ```
    npm install
    ```


4. Run the program:

    dev : ``npm run dev``


5. Enter commands in the following format:

-   To create a loan:
    `LOAN <BankName> <BorrowerName> <Principal> <Years> <Rate>`

-   To make a payment:
    `PAYMENT <BankName> <BorrowerName> <LumpSum> <EMINo>`

-   To check balance:
    `BALANCE <BankName> <BorrowerName> <EMINo>`



## Example Commands
  ```
  LOAN IDIDI Dale 5000 1 6
  PAYMENT IDIDI Dale 1000 5
  BALANCE IDIDI Dale 5
  ```


## Unit Testing

Unit tests for the `Loan` class can be found in the `test` directory. These tests are implemented using Jest, a JavaScript testing framework.

To run the unit tests, execute the following command: `npx jest`


## Program Structure

- `main.js`: Entry point of the program. Reads user input, processes commands, and interacts with the `Loan` class.
- `src/loan.js`: Contains the `Loan` class responsible for loan management.


## For the unit testing part, here's a simple Jest test suite:
```
// test/loan.test.js

const Loan = require("../src/loan");

describe("Loan", () => {
  let loan;

  beforeEach(() => {
    loan = new Loan("TestBank", "TestBorrower", 10000, 2, 5);
  });

  test("Calculate monthly installment", () => {
    expect(loan.calculateEquatedMonthlyInstallment()).toBe(438);
  });

  test("Calculate total interest", () => {
    expect(loan.calculateInterest()).toBe(1000);
  });

  test("Calculate total amount", () => {
    expect(loan.calculateTotalAmount()).toBe(11000);
  });

  test("Make payment", () => {
    loan.makePayment(1000, 3);
    expect(loan.paymentReceived).toEqual([1000]);
  });

  test("Get balance", () => {
    loan.makePayment(1000, 3);
    const balance = loan.getBalance(3);
    expect(balance).toEqual(["TestBank", "TestBorrower", 1000, 21]);
  });
});
```

Ensure you have Jest installed (npm install --save-dev jest) and configured to run tests.