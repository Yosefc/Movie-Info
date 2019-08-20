const express = require("express");
const axios = require("axios");

const router = express.Router();

const API_KEY = process.env.OMDB_API_KEY;

router.get("/movies/current_year", async (req, res) => {
  const titles = [
    "one",
    "blood",
    "private",
    "eye",
    "star",
    "red",
    "bad",
    "dead",
    "private",
    "killer",
    "little",
    "black"
  ];
  try {
    const date = new Date();
    const current_year = date.getFullYear();
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${
        titles[Math.floor(Math.random() * titles.length)]
      }&y=${current_year}&apikey=${API_KEY}`
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.log({ error });
    res.status(500).send("Unable to connect to server...");
  }
});

router.get("/movie/movie_id=:movie_id", async (req, res) => {
  try {
    const { movie_id } = req.params;
    const movieData = await axios.get(`http://www.omdbapi.com/?i=${movie_id}&apikey=${API_KEY}`);
    if (movieData.data.Response === "False") {
      res.status(404).send("Movie not found..");
    } else {
      res.status(200).send(movieData.data);
    }
  } catch (error) {
    res.status(500).send("Could not reach server");
  }
});

router.get("/search/title/title=:title&page=:pageNumber", async (req, res) => {
  try {
    const { title, pageNumber } = req.params;
    const searchResults = await axios.get(
      `http://www.omdbapi.com/?s=${title}&page=${pageNumber}&apikey=${API_KEY}`
    );
    if (searchResults.data.Response === "False") {
      res.status(404).send("We couldn't find any movies.. :(");
    } else {
      res.status(200).send(searchResults.data);
    }
  } catch (error) {
    console.log({ error });
    res.status(500).send("Could not reach server");
  }
});

module.exports = router;
