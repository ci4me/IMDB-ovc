const removeAllLetters = require('../src/utils/removeAllLetters');
const getRelatedMovies = require('../src/utils/getRelatedMovies');
const request = require('supertest');
const app = require('../src/app');

// Testa a API
describe('API', () => {
  // Verifica se retorna status 200 ao pegar os filmes relacionados da API
  it('should return related movies from API', async () => {
  	const movieId = 'tt0086190';
    const response = await request(app).get(`/${movieId}`);
    expect(response.status).toBe(200);
  });

  // Verifica se retorna status 500 ao pegar os filmes relacionados da API ao enviar um movieId errado
  it('should return 500 error from API', async () => {
  	const movieId = 't';
    const response = await request(app).get(`/${movieId}`);
    expect(response.status).toBe(500);
  });  
});

// Testa as funções usadas na API
describe('API Functions', () => {
  // Verifica se retira as letras do texto (TV Series 2010) e se retorna apenas o número do ano
  it('should remove all letters of (TV Series 2010) - expected: 2010', () => {
    const year = '(TV Series 2010)';
    const yearFormatted = removeAllLetters(year);
    expect(yearFormatted).toBe('2010');
  });

  // Verifica se faz o scrap e retorna os filmes relacionados
  it('should scrap "Star Wars: Episode VI - Return of the Jedi" related movies from IMDb', async () => {
  	const movieId = 'tt0086190';
  	const relatedMovies = await getRelatedMovies(movieId);
  	const relatedMoviesLength = relatedMovies.length;
  	expect(relatedMoviesLength).toBeGreaterThan(0);
  });

  // Verifica se cai no Catch com um id inválido
  it('should show error with inválido IMDb id', async () => {
    try {
  	  const movieId = 't';
  	  const relatedMovies = await getRelatedMovies(movieId);
    } catch(error) {
      expect(error).toBeDefined();
    }
  });
});