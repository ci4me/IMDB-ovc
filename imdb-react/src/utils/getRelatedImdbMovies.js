/**
 * @fileoverview Related movies data functions
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

import relatedImdbUrl from '../configs/relatedImdbUrl';

/**
 * @desc Function to return related movies data
 * @param {string} movieId The IMDB ID of the movie
 * @returns {Promise} Promise object with the related movies data
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
function getRelatedImdbMovies(movieId) {
  return new Promise(async (resolve, reject) => {
    try {
      // Faz a requisição à API e retorna os filmes relacionados
      const relatedImdbMoviesCall = await fetch(`${relatedImdbUrl}/${movieId}`);
      const relatedImdbMoviesResults = await relatedImdbMoviesCall.json();
      resolve(relatedImdbMoviesResults);
    } catch(error) {
      reject(error);
    }
  });  
}

export default getRelatedImdbMovies;