/**
 * @fileoverview Movie list Component
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './index.scss';

/**
 * The JSX for each movie on the list
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
const MovieList = ({ movies, onMovieClick }) => {
  // Generates the itens for the list with the movies
  const generateListItems = () => movies.map(movie => {
  	return (
  	<ListItem onClick={() => onMovieClick(movie)} key={movie.imdbLink}>
      {/* Checks for the movie poster */}
  	  { movie.Poster !== 'N/A' ? <img src={movie.Poster} loading="lazy" className="movie-list-poster" alt={`${movie.Title} Poster`} /> : null }	
      {/* Checks for the movie type */}
      { movie.Type ? <ListItemText primary={movie.Title} secondary={`${movie.Year} (${movie.Type})`} /> : null }
      {/* Checks for the movie rating */}
      { movie.Rating ? <ListItemText primary={movie.Title} secondary={`${movie.Year}`} /> : null }
  	  { movie.Rating ? <Rating value={movie.Rating / 2} readOnly /> : null }
  	</ListItem>
  	);
  });

  return (
    <List>
      { generateListItems() } {/* Generates and return the list */}
    </List>
  );
};

export default MovieList;