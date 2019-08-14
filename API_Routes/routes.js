const express = require("express");
const axios = require("axios");
const resultsController = require("./resultsController");

const router = express.Router();

router.get("/movie/:queryType&:queryString", async (req, res) => {
  resultsController(req, res);
});

router.get("/search/title/:queryType&:queryString", async (req, res) => {
  resultsController(req, res);
});

module.exports = router;
