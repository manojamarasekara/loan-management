const Loan = require("../src/loan");

describe("Loan Class Tests", () => {
  // Test case for constructor
  test("Loan constructor initializes properties correctly", () => {
    const loan = new Loan("Bank", "Borrower", 5000, 1, 6);

    expect(loan.bankName).toBe("Bank");
    expect(loan.borrowerName).toBe("Borrower");
    expect(loan.principal).toBe(5000);
    expect(loan.years).toBe(1);
    expect(loan.yearlyRate).toBe(6);
    expect(loan.emiAmount).toBe(431);
    expect(loan.totalAmount).toBe(5300);
    expect(loan.totalToRecover).toBe(5300);
    expect(loan.emisPaid).toBe(0);
    expect(loan.numberOfEMIs).toBe(12);
    expect(loan.paymentReceived).toEqual([]);
  });

  // Test - calculateEquatedMonthlyInstallment method
  test("calculateEquatedMonthlyInstallment returns correct EMI", () => {
    const loan = new Loan("Bank", "Borrower", 5000, 1, 6);

    expect(loan.calculateEquatedMonthlyInstallment()).toBe(431);
  });

  // Test - calculateInterest method
  test("calculateInterest returns correct Interest", () => {
    const loan = new Loan("Bank", "Borrower", 5000, 1, 6);

    expect(loan.calculateInterest()).toBe(300);
  });

  // Test - calculateTotalAmount method
  test("calculateTotalAmount returns correct total amount", () => {
    const loan = new Loan("Bank", "Borrower", 5000, 1, 6);

    expect(loan.calculateTotalAmount()).toBe(5300);
  });
});
