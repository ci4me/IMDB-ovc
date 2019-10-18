/**
 * @fileoverview Functions to scrap information from IMDB website
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

const removeAllLetters = require('./removeAllLetters');
const rp = require('request-promise');
const $ = require('cheerio'); //Cheerio because I LUV jQuery

/**
 * @desc Function to return wikipedia data
 * @param {string} imdbId The IMDB movie ID
 * @returns {Promise} Promise object with the movies data
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
function getRelatedMovies(imdbId) {
  return new Promise(async (resolve, reject) => {
    const relatedMovies = [];

    try {
      // Get the HTML from the IMDB page
      const htmlCode = await rp(`https://www.imdb.com/title/${imdbId}/`);
      
      // Set the variables with the relevant information...
      const relatedMoviesElements = $('.nobr', htmlCode);
      const relatedMoviesElementsDivTitles = $('.rec-title', htmlCode); 
      const relatedMoviesElementsLinks = $('.rec-title a', htmlCode);
      const relatedMoviesElementsTitles = $('.rec-title a b', htmlCode);
      const relatedMoviesElementsImages = $('.rec_poster_img', htmlCode);
      const relatedMoviesElementsRatings = $('.rating-list', htmlCode);

      // Get the number of TITLE elements
      const relatedMoviesElementsLength = Object.getOwnPropertyNames(relatedMoviesElementsTitles).length - 3;

      // Loop over the titles
      for(let relatedMoviesElementsIndex = 0; relatedMoviesElementsIndex < relatedMoviesElementsLength; relatedMoviesElementsIndex++) {
        const relatedMoviesElement = relatedMoviesElements[relatedMoviesElementsIndex];
        const relatedMoviesElementDivTitle = relatedMoviesElementsDivTitles[relatedMoviesElementsIndex];
        const relatedMoviesElementLink = relatedMoviesElementsLinks[relatedMoviesElementsIndex];
        const relatedMoviesElementTitle = relatedMoviesElementsTitles[relatedMoviesElementsIndex];
        const relatedMoviesElementsImage = relatedMoviesElementsImages[relatedMoviesElementsIndex];
        const relatedMoviesElementsRating = relatedMoviesElementsRatings[relatedMoviesElementsIndex];

        //Get the year 
        let relatedMoviesYear = '';

        //Check for a SPAN with the year
        relatedMoviesElementDivTitle.children.forEach(child => {
          if(child.name === 'span') {
            if(child.attribs.class === 'nobr')
              relatedMoviesYear = child.children[0].data;
          }
        });

        // If the year is not set...
        if(!relatedMoviesYear)
          relatedMoviesYear = '–';

        // Formats the year, grabs the title, create the link, grab the image and the ID
        const relatedMoviesYearFormatted = removeAllLetters(relatedMoviesYear);
        const relatedMoviesTitle = relatedMoviesElementTitle.children[0].data;
        const relatedMoviesLink = `https://www.imdb.com${relatedMoviesElementLink.attribs.href}`;
        const relatedMoviesImage = relatedMoviesElementsImage.attribs.loadlate;
        const relatedMoviesId = relatedMoviesElementLink.attribs.href.split('/')[relatedMoviesElementLink.attribs.href.split('/').length - 2].replace('/', '');
        let relatedMoviesRating = '0';

        // Checks if the movie is already rated...
        if(relatedMoviesElementsRating.attribs.title) {
          if(relatedMoviesElementsRating.attribs.title !== 'Awaiting enough ratings - click stars to rate')
            relatedMoviesRating = relatedMoviesElementsRating.attribs.title.split('Users rated this ')[1].split(' (')[0].split('/')[0];
        }

        //Push this movie into the related list to be returned...
        relatedMovies.push({ Title: relatedMoviesTitle, Year: relatedMoviesYearFormatted, imdbLink: relatedMoviesLink, imdbID: relatedMoviesId, Poster: relatedMoviesImage, Rating: relatedMoviesRating });
      }

      // Returns the related movies list...
      resolve(relatedMovies);
    } catch(error) {
      reject(error);
    }
  });
}

module.exports = getRelatedMovies;