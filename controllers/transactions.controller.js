const express = require("express");
const transactions = express.Router();

const transactionsData = require("../models/transactions.models.js");

transactions.get("/", (req, res) => {
  res.json(transactionsData);
});

transactions.post("/", (req, res) => {
  transactionsData.push(req.body);
  console.log(req.body);
  res.json(transactionsData[transactionsData.length - 1]);
});

transactions.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (transactionsData[arrayIndex]) {
    res.json(transactionsData[arrayIndex]);
  } else {
    res.status(302).send("no transactions found - sorry");
  }
});

transactions.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const deletedLog = transactionsData.splice(arrayIndex, 1);
  res.status(200).send(deletedLog);
});

transactions.put("/:index", (req, res) => {
  const { index } = req.params;
  transactionsData[index] = req.body;
  res.status(200).send(transactionsData);
});

module.exports = transactions;
