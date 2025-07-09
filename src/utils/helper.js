const generateRandomBankAccount = () => {
  const accountNumber = `4235${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  return accountNumber;
};

export {generateRandomBankAccount}
