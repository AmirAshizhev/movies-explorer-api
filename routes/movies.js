const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validators');

const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:_id', deleteMovieValidator, deleteMovie);

module.exports = router;
