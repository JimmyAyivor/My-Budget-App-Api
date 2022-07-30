const express = require("express");
const categories = express.Router();

const categoriesData = require("../models/categories.models.js");

categories.get("/", (req, res) => {
  res.json(categoriesData);
});

categories.post("/", (req, res) => {
  categoriesData.push(req.body);
  console.log(req.body);
  res.json(categoriesData[categoriesData.length - 1]);
});

categories.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (categoriesData[arrayIndex]) {
    res.json(categoriesData[arrayIndex]);
  } else {
    res.status(302).send("no categories found - sorry");
  }
});

categories.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const deletedLog = categoriesData.splice(arrayIndex, 1);
  res.status(200).send(deletedLog);
});

categories.put("/:index", (req, res) => {
  const { index } = req.params;
  categoriesData[index] = req.body;
  res.status(200).send(categoriesData);
});

module.exports = categories;
