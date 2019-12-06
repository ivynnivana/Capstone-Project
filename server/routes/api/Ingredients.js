const express = require("express");
const router = express.Router();
const fileName = "../../models/Ingredients.json";
const recipes = require(fileName);
// const helper = require("../../helpers/helpers");

//get all recipe data
router.get("/", (req, res) => {
  res.json(recipes);
});

module.exports = router;
