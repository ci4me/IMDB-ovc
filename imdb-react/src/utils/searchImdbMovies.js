/**
 * @fileoverview OMDB functions
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

// Get OMDB Key from config
import imdbApiKey from '../configs/imdbApiKey';

/**
 * @desc Function to return wikipedia data
 * @param {string} movie The search parameter
 * @param {string} page The page (for pagination)
 * @returns {Promise} Promise object with the movies data
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
function searchImdbMovies(movie, page) {
  return new Promise(async (resolve, reject) => {
    try {
      //Get the data from OMDB API
      const imdbMovieCall = await fetch(`https://www.omdbapi.com/?apikey=${imdbApiKey}&s=${movie}&page=${page}`);
      const imdbMovieResults = await imdbMovieCall.json();

      if(imdbMovieResults.Response === "False")
        return reject(imdbMovieResults);

      resolve(imdbMovieResults);
    } catch(error) {
      reject(error);
    }
  });  
}

export default searchImdbMovies;