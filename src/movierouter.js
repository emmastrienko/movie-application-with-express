const express = require("express");
const router = express.Router();
const movieController = require("./moviecontroller");

router.get("/", (req, res) => {
  try {
    movieController.getMovies((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      } else {
        return res.status(200).send({ STATUS: "OK", data: results });
      }
    });
  } catch (error) {
    console.error("Error in route handler:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId;

    movieController.getMovieById(movieId, (err, results) => {
      if (err) {
        console.error("Error while retrieving movie:", err);
        return res.status(400).send(err);
      } else {
        return res.status(200).send({ STATUS: "OK", data: results });
      }
    });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/", (req, res) => {
  try {
    const movieDetails = req.body;

    movieController.saveMovieDetails(movieDetails, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send({ STATUS: "OK", data: results });
      }
    });
  } catch (err) {
    return res.status(500).send("Try after sometime c");
  }
});

router.patch("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId;

    const movieDetails = req.body;

    movieController.updateMovieDetails(
      movieId,
      movieDetails,
      (err, results) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          return res.status(200).send({ STATUS: "OK", data: results });
        }
      }
    );
  } catch (err) {
    return res.status(500).send("Try after sometime d");
  }
});

router.delete("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId;

    movieController.deleteMovieById(movieId, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send({ STATUS: "OK", data: results });
      }
    });
  } catch (err) {
    return res.status(500).send("Try after sometime e");
  }
});

module.exports = router;
