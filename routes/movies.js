const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:_id', deleteMovie);

module.exports = router;
