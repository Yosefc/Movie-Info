const axios = require("axios");

const { OMDB_API_KEY } = process.env;

const resultsController = async (req, res) => {
  try {
    const { queryString, queryType } = req.params;
    const response = await axios.get(
      `http://www.omdbapi.com/?${queryType}=${queryString}&apikey=${OMDB_API_KEY}`
    );
    if (response.data.Response === "False") {
      res.status(404).send("Sorry, there were no results..");
    } else {
      res.status(200).send(response.data);
    }
  } catch (error) {
    res.status(500).send("Could not reach server");
  }
};

module.exports = resultsController;
