const fs = require("fs");

const getMovies = (done) => {
  fs.readFile("./data/movies.json", (err, fileContent) => {
    if (err) {
      console.error("Error reading movies file:", err);
      return done("Encountered error while getting movies details", undefined);
    }
    try {
      const movieData = JSON.parse(fileContent);
      done(null, movieData);
    } catch (parseError) {
      console.error("Error parsing movie data:", parseError);
      done("Error parsing movie data", undefined);
    }
  });
};

const getMovieById = (movieId, done) => {
  console.log("Movie ID:", movieId);
  fs.readFile("./data/movies.json", (err, fileContent) => {
    if (err) {
      console.error("Error reading movies file:", err);
      return done("Encountered error while getting movies details", undefined);
    }
    try {
      const movieData = JSON.parse(fileContent);
      const moviesArray = movieData.movies;
      const fetchedMovie = moviesArray.find((movie) => movie.id == movieId);
      console.log(fetchedMovie);
      if (fetchedMovie === undefined) {
        return done("No movie found with the provided ID", undefined);
      } else {
        return done(undefined, fetchedMovie);
      }
    } catch (parseError) {
      console.error("Error parsing movie data:", parseError);
      return done("Error parsing movie data: " + parseError.message, undefined);
    }
  });
};

const saveMovieDetails = (movieDetails, done) => {
  fs.readFile("./data/movies.json", (err, fileContent) => {
    if (err) {
      console.error("Error reading movies file:", err);
      return done("Encountered error while saving movie details", undefined);
    }
    try {
      const movieData = JSON.parse(fileContent);

      movieData.movies.push(movieDetails);

      fs.writeFile(
        "./data/movies.json",
        JSON.stringify(movieData, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing movies file:", err);
            return done(
              "Encountered error while saving movie details",
              undefined
            );
          }

          done(null, "Movie details saved successfully");
        }
      );
    } catch (parseError) {
      console.error("Error parsing movie data:", parseError);
      return done(
        "Error saving movie details: " + parseError.message,
        undefined
      );
    }
  });
};

const updateMovieDetails = (movieId, movieDetails, done) => {
  fs.readFile("./data/movies.json", (err, fileContent) => {
    if (err) {
      console.error("Error reading movies file:", err);
      return done("Encountered error while updating movie details", undefined);
    }
    try {
      const movieData = JSON.parse(fileContent);

      const movieIndex = movieData.movies.findIndex(
        (movie) => movie.id == movieId
      );

      if (movieIndex !== -1) {
        movieData.movies[movieIndex] = {
          ...movieData.movies[movieIndex],
          ...movieDetails,
        };

        fs.writeFile(
          "./data/movies.json",
          JSON.stringify(movieData, null, 2),
          (err) => {
            if (err) {
              console.error("Error writing movies file:", err);
              return done(
                "Encountered error while updating movie details",
                undefined
              );
            }

            done(null, "Movie details updated successfully");
          }
        );
      } else {
        done("No movie found with the provided ID", undefined);
      }
    } catch (parseError) {
      console.error("Error parsing movie data:", parseError);
      return done(
        "Error updating movie details: " + parseError.message,
        undefined
      );
    }
  });
};

const deleteMovieById = (movieId, done) => {
  fs.readFile("./data/movies.json", (err, fileContent) => {
    if (err) {
      console.error("Error reading movies file:", err);
      return done("Encountered error while deleting movie", undefined);
    }
    try {
      const movieData = JSON.parse(fileContent);

      const movieIndex = movieData.movies.findIndex(
        (movie) => movie.id == movieId
      );

      if (movieIndex !== -1) {
        movieData.movies.splice(movieIndex, 1);

        fs.writeFile(
          "./data/movies.json",
          JSON.stringify(movieData, null, 2),
          (err) => {
            if (err) {
              console.error("Error writing movies file:", err);
              return done("Encountered error while deleting movie", undefined);
            }

            done(null, "Movie deleted successfully");
          }
        );
      } else {
        done("No movie found with the provided ID", undefined);
      }
    } catch (parseError) {
      console.error("Error parsing movie data:", parseError);
      return done("Error deleting movie: " + parseError.message, undefined);
    }
  });
};

module.exports = {
  getMovies,
  getMovieById,
  saveMovieDetails,
  deleteMovieById,
  updateMovieDetails,
};
