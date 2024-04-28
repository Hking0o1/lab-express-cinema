const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie.model');
/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

module.exports = router;

//movies page

router.get('/movies', (req, res, next) => {
    Movie.find()
      .then(allTheMovieFromDB => {
        console.log('Retrieved movies from DB:', allTheMovieFromDB);
        res.render('../views/movie.hbs', { movies : allTheMovieFromDB });  })
      .catch(error => {
        console.log('Error while getting the movies from the DB: ', error);
  
        next(error);
      });
  });

  //movie description

  router.get('/movies/:movieId', (req, res, next) => {
    const { movieId } = req.params;
  
    Movie.findById(movieId)
      .then(theMovie => res.render('../views/movie-details.hbs', { movie: theMovie }))
      .catch(error => {
        console.log('Error while retrieving book details: ', error);
  
        // Call the error-middleware to display the error page to the user
        next(error);
      });
  });
  