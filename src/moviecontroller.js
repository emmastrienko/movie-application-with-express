//import service layer
const service = require("./movieservice");

const getMovies = (done) => {
  service.getMovies((err, movies) => {
    if (err) {
      done(err, null);
    } else {
      done(null, movies);
    }
  });
};

const getMovieById = (movieId, done) => {
  service.getMovieById(movieId, (err, movie) => {
    if (err) {
      done(err, null);
    } else {
      done(null, movie);
    }
  });
};

const saveMovieDetails = (movieDetails, done) => {
  service.saveMovieDetails(movieDetails, (err, movie) => {
    if (err) {
      done(err, null);
    } else {
      done(null, movie);
    }
  });
};

const updateMovieDetails = (movieId, movieDetails, done) => {
  service.updateMovieDetails(movieId, movieDetails, (err, movie) => {
    if (err) {
      done(err, null);
    } else {
      done(null, movie);
    }
  });
};

const deleteMovieById = (movieId, done) => {
  service.deleteMovieById(movieId, (err, movie) => {
    if (err) {
      done(err, null);
    } else {
      done(null, movie);
    }
  });
};

module.exports = {
  getMovies,
  getMovieById,
  saveMovieDetails,
  updateMovieDetails,
  deleteMovieById,
};
