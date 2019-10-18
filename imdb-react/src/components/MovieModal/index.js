/**
 * @fileoverview Modal with Movie Details Component
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

import React, { Component } from "react";
import { Modal, Link, Button, CircularProgress } from "@material-ui/core";
import MovieList from "../MovieList";

import getWikipediaMovieContent from "../../utils/getWikipediaMovieContent";
import getRelatedImdbMovies from "../../utils/getRelatedImdbMovies";

import "./index.scss";

/**
 * The header JSX for the modal
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
const MovieModalHeader = ({ movie, onSummaryClick, onRelatedClick }) => (
  <div className="modal-movie-header">
    {movie.Poster !== "N/A" ? (
      <img src={movie.Poster} loading="lazy" alt={`${movie.Title} Poster`} />
    ) : null}
    <div>
      <h1>{movie.Title}</h1>
      <div className="modal-movie-links">
        <Button onClick={onSummaryClick}>Summary</Button>{" "}
        {/* First button: The Summary from Wikipedia */}
        <Link href={movie.imdbLink} target="_blank">
          <Button>IMDb</Button> {/* Second button: The link to IMDB */}
        </Link>
        <Link href={movie.wikipediaLink} target="_blank">
          <Button>Wikipedia</Button> {/* Third button: The link to Wikipedia */}
        </Link>
        <Button onClick={onRelatedClick}>Related (More like this)</Button>{" "}
        {/* Forth button: The Related Movies */}
      </div>
    </div>
  </div>
);

/**
 * @class MovieModal
 * @desc Modal with Movie Details,
 * @extends Component
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
class MovieModal extends Component {
  state = {
    loadingWikipediaData: true,
    loadingRelatedMovies: true,
    showRelatedMovies: false,
    relatedImdbMovies: [],
    movie: this.props.movie
  };

  /**
   * @desc Method that is executed when the modal is mounted...
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  componentDidMount() {
    this.setWikipediaData(); //Get wikipedia data
    this.setRelatedMovies(); //Get related movies data
  }

  /**
   * When the Modal properties are changed (by clicking on a related movie),
   * check if it is the same movie,
   * if it is not the same: reset the state and look for the wikipedia and related movies again
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  componentWillReceiveProps({ movie }) {
    const isMovieDifferent = this.state.movie.Title !== movie.Title;

    if (isMovieDifferent) this.resetState(movie);
  }

  /**
   * @desc Method to search for related movies
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setRelatedMovies = async () => {
    try {
      // Get the related movies from NODE scrapping IMDB page
      const relatedMovies = await getRelatedImdbMovies(this.state.movie.imdbID);

      // Update the related movies and finish the loading
      this.setRelatedImdbMovies(relatedMovies);
      this.setLoadingRelatedMovies(false);
    } catch (error) {
      this.setLoadingRelatedMovies(false);
    }
  };

  /**
   * @desc Method to search in Wikipedia for the movie information
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setWikipediaData = async () => {
    //Get the movie info
    const { movie } = this.state;

    try {
      // Get data from wikipedia
      const movieWikipediaData = await getWikipediaMovieContent(movie.Title);

      // Set Wikipedia link
      movie.wikipediaLink = `https://en.wikipedia.org/?curid=${movieWikipediaData.pageId}`;
      // Set the content being the first paragraph
      movie.wikipediaContent = movieWikipediaData.text.split("\n")[0];

      //Update the movie information with the new data
      await this.setMovie(movie);
      // Stop the LOADING
      this.setLoadingWikipediaData(false);
    } catch (error) {
      console.log(error);
      this.setLoadingWikipediaData(false);
    }
  };

  /**
   * @desc Method to Reset the state to default values and search for the new data
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  resetState = async movie => {
    await this.setMovie(movie);

    this.setLoadingWikipediaData(true);
    this.setLoadingRelatedMovies(true);

    this.setShowRelatedMovies(false);
    this.setRelatedImdbMovies([]);

    this.setWikipediaData();
    this.setRelatedMovies();
  };

  /**
   * @desc Method to update the movie
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setMovie = movie => {
    return new Promise(async resolve => {
      this.setState({ movie });
      resolve();
    });
  };

  /**
   * @desc Method to update the related movies
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setRelatedImdbMovies = relatedImdbMovies => {
    this.setState({ relatedImdbMovies });
  };

  /**
   * @desc Method to update the wikipedia loading status
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setLoadingWikipediaData = loadingWikipediaData => {
    this.setState({ loadingWikipediaData });
  };

  /**
   * @desc Method to update the related movies loading
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setLoadingRelatedMovies = loadingRelatedMovies => {
    this.setState({ loadingRelatedMovies });
  };

  /**
   * @desc Method to update if the related movies should be shown or not
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setShowRelatedMovies = showRelatedMovies => {
    this.setState({ showRelatedMovies });
  };

  /**
   * @desc When the first button (summary) is clicked, hide the related movies list
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onSummaryClick = () => {
    this.setShowRelatedMovies(false);
  };

  /**
   * @desc When the forth button (related) is clicked, hide the summary
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onRelatedClick = () => {
    this.setShowRelatedMovies(true);
  };
  
  /**
   * When a Related Movie is clicked, call the onRelatedMovieClick()
   * to load the related movie info on the main modal
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onRelatedMovieClick = relatedMovie => {
    const { onRelatedMovieClick } = this.props;
    onRelatedMovieClick(relatedMovie);
  };

  render() {
    const { onSummaryClick, onRelatedClick, onRelatedMovieClick } = this;
    const { onModalClose } = this.props;
    const {
      loadingWikipediaData,
      showRelatedMovies,
      loadingRelatedMovies,
      relatedImdbMovies,
      movie
    } = this.state;

    // If is searching for data from Wikipedia or Related Movies
    if (loadingWikipediaData || loadingRelatedMovies)
      return (
        <Modal open={true} onClose={onModalClose} className="modal">
          <div className="modal-movie modal-movie-loading">
            <CircularProgress />
          </div>
        </Modal>
      );

    // If is not searching, return the modal with movie data
    return (
      <Modal open={true} onClose={onModalClose} className="modal">
        <div className="modal-movie">
          <MovieModalHeader
            movie={movie}
            onSummaryClick={onSummaryClick}
            onRelatedClick={onRelatedClick}
          />
          {!showRelatedMovies ? <p> {movie.wikipediaContent} </p> : null}
          {showRelatedMovies ? (
            <MovieList
              movies={relatedImdbMovies}
              onMovieClick={onRelatedMovieClick}
            />
          ) : null}
        </div>
      </Modal>
    );
  }
}

export default MovieModal;
