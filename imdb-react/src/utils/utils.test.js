/**
 * @fileoverview Testing APIs
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

import getRelatedImdbMovies from './getRelatedImdbMovies';
import getWikipediaMovieContent from './getWikipediaMovieContent';
import searchImdbMovies from './searchImdbMovies';

describe('Utils', () => {

  //Verifies the OMDB Api 
  it('should get "Star Wars" search imdb movies first page', async () => {
  	const search = 'Star Wars';
  	const movies = await searchImdbMovies(search, 1);
  	expect(movies.Response).toBe("True");
  });  

  //Verifies the Wikipedia Api 
  it('should get "Star Wars: Episode IV - A New Hope" wikipedia movie content', async () => {
  	const title = 'Star Wars: Episode IV - A New Hope';
  	const wikipediaMovieContent = await getWikipediaMovieContent(title);
  	expect(wikipediaMovieContent.pageId).toBe('52549');
  });  

  //Verifies the Related Movies Api 
  it('should get "Star Wars: Episode IV - A New Hope" related imdb movies', async () => {
  	const movieId = 'tt0086190';
  	const relatedMovies = await getRelatedImdbMovies(movieId);
  	const relatedMoviesLength = relatedMovies.length;
  	expect(relatedMoviesLength).toBeGreaterThan(0);
  }, 16000);
});