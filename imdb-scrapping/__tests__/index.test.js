const removeAllLetters = require('../src/utils/removeAllLetters');
const getRelatedMovies = require('../src/utils/getRelatedMovies');
const request = require('supertest');
const app = require('../src/app');

describe('API', () => {

  it('should return related movies from API', async () => {
  	const movieId = 'tt0086190';
    const response = await request(app).get(`/${movieId}`);
    expect(response.status).toBe(200);
  });


  it('should return 500 error from API', async () => {
  	const movieId = 't';
    const response = await request(app).get(`/${movieId}`);
    expect(response.status).toBe(500);
  });  
});

describe('API Functions', () => {

  it('should remove all letters of (TV Series 2010) - expected: 2010', () => {
    const year = '(TV Series 2010)';
    const yearFormatted = removeAllLetters(year);
    expect(yearFormatted).toBe('2010');
  });

  it('should scrap "Star Wars: Episode VI - Return of the Jedi" related movies from IMDb', async () => {
  	const movieId = 'tt0086190';
  	const relatedMovies = await getRelatedMovies(movieId);
  	const relatedMoviesLength = relatedMovies.length;
  	expect(relatedMoviesLength).toBeGreaterThan(0);
  });

  it('should show error with inválido IMDb id', async () => {
    try {
  	  const movieId = 't';
  	  const relatedMovies = await getRelatedMovies(movieId);
    } catch(error) {
      expect(error).toBeDefined();
    }
  });
});
