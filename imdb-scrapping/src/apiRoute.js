/**
 * @fileoverview Routes
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

const getRelatedMovies = require('./utils/getRelatedMovies');

const apiRoute = async (req, res) => {
  try {
    //Get the movie ID from params
    const { movieId } = req.params;
    //Scrap the data from the IMDB page
    const relatedMovies = await getRelatedMovies(movieId);
    res.json(relatedMovies);
  } catch(error) {
    // If anything goes wrong...
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = apiRoute;