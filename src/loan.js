class Loan {
  constructor(bankName, borrowerName, principal, years, rate) {
    this.bankName = bankName;
    this.borrowerName = borrowerName;
    this.principal = parseInt(principal);
    this.years = parseInt(years);
    this.yearlyRate = parseInt(rate);
    this.emiAmount = this.calculateEquatedMonthlyInstallment();
    this.totalAmount = this.calculateTotalAmount();
    this.totalToRecover = this.totalAmount;
    this.emisPaid = 0;
    this.numberOfEMIs = this.years * 12;
    this.paymentReceived = [];
  }

  /**
   * Calculates the monthly installment amount
   * @param {number}
   * @return {number}
   */
  calculateEquatedMonthlyInstallment() {
    const p = this.principal;
    const n = this.years * 12;
    const r = this.yearlyRate / 100 / 12;

    const emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));

    return Math.ceil(emi);
  }

  /**
   * Calculates the total interest amount
   * @returns {number}
   */
  calculateInterest() {
    return Math.ceil((this.principal * this.years * this.yearlyRate) / 100);
  }

  /**
   * Calculates the total amount to recover
   * @returns {number}
   */
  calculateTotalAmount() {
    return this.principal + this.calculateInterest();
  }

  /**
   * This method is called when the user sends a payment command.
   * @param {number} lumpSum 
   * @param {number} emiNo 
   * @returns 
   */
  makePayment(lumpSum, emiNo) {
    let totalPaid = 0;
    this.paymentReceived.forEach((payment) => {
      totalPaid += payment;
    });

    if (this.totalAmount === totalPaid) {
        console.log("You have already paid the total loan amount.");
        return;
    } else if (emiNo <= this.emisPaid) {
        console.log("EMI already paid for the EMI number entered.");
        return;
    }

    const newTotalPayment = totalPaid + lumpSum;

    if(newTotalPayment < this.totalAmount) {
        this.emisPaid = emiNo;
        this.paymentReceived.push(lumpSum);
        this.totalToRecover -= lumpSum;
        if (this.totalToRecover < this.emiAmount) {
            console.log(`Last EMI amount is ${this.totalToRecover}`);
        }
        console.log("Payment made successfully.");
    } else if (newTotalPayment === this.totalAmount) {
        console.log("Payment made successfully. Congratulations you have settled the Loan.");
        return;
    }else {
        let extraAmount = newTotalPayment - this.totalAmount;
        console.log(`Your are paying ${extraAmount} more!`);
        return;
    }
  }

  /**
   * This method is called when the user sends a balance command
   * @param {number} emiNo 
   * @returns 
   */
  getBalance(emiNo) {
    const emisRemaining = this.numberOfEMIs - emiNo;
    let amountPaid = 0;
    this.paymentReceived.forEach((payment) => {
        amountPaid += payment;
    });
    return [this.bankName, this.borrowerName, amountPaid, emisRemaining];
  }
}

module.exports = Loan;
