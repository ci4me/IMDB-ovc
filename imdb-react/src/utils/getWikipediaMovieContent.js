/**
 * @fileoverview Wikipedia functions
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

/**
 * @desc Function to return wikipedia data
 * @param {string} title The title of the movie
 * @returns {Promise} Promise object with wikipedia data
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
function getWikipediaMovieContent(title) {
  return new Promise(async (resolve, reject) => {
    try {
      //Call wikipedia´s api
      const wikipediaMovieContentCall = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&rvprop=content&maxlag=5&rvslots=main&origin=*&format=json&redirects=true&titles=${title}`
      );
      const wikipediaMovieContentResult = await wikipediaMovieContentCall.json();
      const wikipediaMovieContent = {};

      //Get the page ID and the content
      wikipediaMovieContent.pageId = Object.getOwnPropertyNames(
        wikipediaMovieContentResult.query.pages
      )[0];
      wikipediaMovieContent.text =
        wikipediaMovieContentResult.query.pages[
          wikipediaMovieContent.pageId
        ].extract;

      resolve(wikipediaMovieContent);
    } catch (error) {
      reject(error);
    }
  });
}

export default getWikipediaMovieContent;
