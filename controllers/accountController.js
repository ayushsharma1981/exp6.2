const Account = require("../models/Account");

// GET BALANCE
exports.getBalance = async (req, res) => {
  const account = await Account.findOne({ userId: req.user.id });
  res.json(account || { balance: 0 });
};

// DEPOSIT
exports.deposit = async (req, res) => {
  const { amount } = req.body;

  let account = await Account.findOne({ userId: req.user.id });

  if (!account) {
    account = await Account.create({ userId: req.user.id, balance: 0 });
  }

  account.balance += amount;
  await account.save();

  res.json(account);
};