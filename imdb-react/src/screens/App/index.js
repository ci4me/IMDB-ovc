/**
 * @fileoverview Main Screen (APP)
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

import React, { Component } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import Header from '../../components/Header';
import Form from '../../components/Form';
import MovieList from '../../components/MovieList';
import MovieModal from '../../components/MovieModal';
import DialogSearchError from '../../components/DialogSearchError';

import searchImdbMovies from '../../utils/searchImdbMovies';

/**
 * @class App
 * @description Main Screen with all the components 
 * @extends Component
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
class App extends Component {
  state = {
    loadingMovies: false,
    modalOpen: false,
    dialogSearchErrorOpen: false,
    totalResults: 0,
    page: 1,
    movieSearch: '',
    movies: [],
    modalMovie: {}
  };

  
  /**
   * @desc Method that is executed when the component is mounted
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  /**
   * @desc Method that is executed when the form is submited
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onMovieSearchSubmit = async movie => {

    this.setMovieSearch(movie);
    this.setPage(1);
    this.setLoadingMovies(true); //Start the loading
    this.setMovies([]); //Reset movies

    try {
      // Search for movies with the input data
      const imdbMoviesResult = await searchImdbMovies(movie, 1);
      const imdbMovies = this.setImdbLinks(imdbMoviesResult.Search);


      this.setLoadingMovies(false); //Finished loading...
      this.setTotalResults(imdbMoviesResult.totalResults); //Show the number of results
      this.setMovies(imdbMovies); //Show the movies

      // If the is more than 10 results...
      const totalResultsIsLowerOrEqualThanTen = imdbMoviesResult.totalResults <= 10;

      if(!totalResultsIsLowerOrEqualThanTen){
        this.setNewMoviePage(); // Show a new page of results...
      }
        

    } 
    catch(error) { //If ERROR stop loading and show the error dialog
      console.log(error);
      this.setLoadingMovies(false);
      this.setDialogSearchErrorCloseOpen(true);
    }
  }

  /**
   * @desc Method to show more movies from the result (pagination)
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setImdbMovies = async() => {
    const { movieSearch, movies, page } = this.state;

    this.setLoadingMovies(true);
  
    try {     
      // Procura os filmes com o título digitado
      const imdbMoviesResult = await searchImdbMovies(movieSearch, page);
      const imdbMovies = this.setImdbLinks(imdbMoviesResult.Search);

      // Termina o Loading e mostra os Filmes
      this.setLoadingMovies(false);
      this.setMovies([...movies, ...imdbMovies]);
    } catch(error) {
      // Se der um erro, termina o loading e mostra um diálogo de erro
      this.setLoadingMovies(false);
      this.setDialogSearchErrorCloseOpen(true);
    }
  }

  /**
   * @desc Method to add IMDB link to movie
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setImdbLinks = movies => {
    movies.map(movie => {
      movie.imdbLink = `https://www.imdb.com/title/${movie.imdbID}/`;
      return movie;
    });

    return movies;
  }

  /**
   * @desc Method to update the loading state when searching for movies
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setLoadingMovies = loadingMovies => {
    this.setState({ loadingMovies });
  }


  /**
   * @desc Method to update the page
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setPage = page => {
    this.setState({ page });
  }


  /**
   * @desc Method to update the movies
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setMovies = movies => {
    this.setState({ movies });
  }

  /**
   * @desc Method to update the total number of results
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setTotalResults = totalResults => {
    this.setState({ totalResults });
  }

  /**
   * @desc Method to update the modal status
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setMovieModalOpen = modalOpen => {
    this.setState({ modalOpen });
  }

  /**
   * @desc Method to update the movie to be shown in the Modal
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setModalMovie = modalMovie => {
    this.setState({ modalMovie });
  }

  setMovieSearch = movieSearch => {
    this.setState({ movieSearch });
  }

  /**
   * @desc Method to update the ERROR dialog
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setDialogSearchErrorCloseOpen = dialogSearchErrorOpen => {
    this.setState({ dialogSearchErrorOpen });
  }

   /**
   * @desc Method to open the modal with the selected movie information
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  openMovieModal = movie => {
    this.setModalMovie(movie);
    this.setMovieModalOpen(true);
  }

  /**
   * @desc Method to be executed when the modal closes
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onModalClose = () => {
    this.setMovieModalOpen(false);
  }


  /**
   * @desc Method to be executed when the error dialog closes
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onDialogSearchErrorClose = () => {
    this.setDialogSearchErrorCloseOpen(false);
  }
  
  /**
   * @desc Method to be executed when scroling the page - Scroll until there are movies to be shown...
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onScroll = event => {
    const { loadingMovies, totalResults, movies } = this.state;
    const elementScrollReachedEnd = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;
    const totalResultsIsLowerOrEqualThanMoviesLength = totalResults <= movies.length;

    if (elementScrollReachedEnd && !loadingMovies && !totalResultsIsLowerOrEqualThanMoviesLength)
      this.setNewMoviePage();
  }


  /**
   * @desc Method to add one more movie page 
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setNewMoviePage = () => {
    const { page } = this.state;
    this.setPage(page + 1);
    this.setImdbMovies();
  }

  /**
   * @desc React Render Method
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  render() {
    const { onMovieSearchSubmit, openMovieModal, onModalClose, onDialogSearchErrorClose } = this;
    const { loadingMovies, dialogSearchErrorOpen, modalOpen, movies, totalResults, modalMovie } = this.state;

    return (
      <div>
        <Header />
        
        <Grid container direction="column" justify="center" align="center">
          <Form onMovieSearchSubmit={onMovieSearchSubmit} />
          { totalResults ? <Typography className="app-total-results">Found <span>{totalResults}</span> results</Typography> : null}
          <MovieList movies={movies} onMovieClick={openMovieModal} />
          { loadingMovies ? <CircularProgress /> : null }
        </Grid>

        { modalOpen ? <MovieModal movie={modalMovie} onModalClose={onModalClose} onRelatedMovieClick={openMovieModal} /> : null }
        { dialogSearchErrorOpen ? <DialogSearchError onClose={onDialogSearchErrorClose} /> : null }
      </div>
    );
  }
}

export default App;
