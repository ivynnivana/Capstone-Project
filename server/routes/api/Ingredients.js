const express = require("express");
const router = express.Router();
const fileName = "../../models/Ingredients.json";
const recipe = require(fileName);
// const helper = require("../../helpers/helpers");

//get recipe data
router.get("/", (req, res) => {
  res.json(recipe);
});

module.exports = router;
