const readline = require("readline");

const Loan = require("./src/loan");

const loanAmount = [
  "LOAN IDIDI Dale 5000 1 6",
  // "LOAN MBI Harry 10000 3 7",
  // "LOAN UON Shelly 15000 2 9",
];

const paymentAmount = [
  "PAYMENT IDIDI Dale 1000 5",
  // "PAYMENT MBI Harry 5000 10",
  // "PAYMENT UON Shelly 7000 12",
];

const readStream = readline.createInterface({
  input: process.stdin,
});

const loanDB = {};

readStream.on("line", (input) => {
  const [command, ...args] = input.trim().split(" ");
  if (args.length > 0) {
    switch (command) {
      case "LOAN":
        loanDB[args[1]] = new Loan(args[0], args[1], args[2], args[3], args[4]);
        console.log(loanDB);
        break;

      case "PAYMENT":
        loanDB[args[1]].makePayment(parseInt(args[2]), parseInt(args[3]));
        console.log(loanDB);
        break;

      case "BALANCE":
        const balance = loanDB[args[1]].getBalance(args[2]);
        console.log(balance);
        break;

      default:
        console.log("Invalid command");
    }
  } else {
    console.error(`Invalid data entered!`);
  }
});
