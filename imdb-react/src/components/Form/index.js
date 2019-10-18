/**
 * @fileoverview Main Search Form Component
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

import React, { Component } from "react";
import { FormControl, InputLabel, Input, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./index.scss";

/**
 * @class Form
 * @desc Main Search Form
 * @extends Component
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
class Form extends Component {
  state = {
    movieSearchValue: ""
  };

  /**
   * @desc Method that is executed when the search form is submited
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onFormSubmit = event => {
    event.preventDefault(); //Prevent this form default behavior

    const { movieSearchValue } = this.state;
    const { onMovieSearchSubmit } = this.props;

    //Variable that will tell us if the search input is empty or not
    const isMovieValueEmpty = movieSearchValue === "";

    //If the sent value is empty, stops the function
    if (isMovieValueEmpty) return;

    //Execute the App Screen function onMovieSearchSubmit() with the input sent by the user
    onMovieSearchSubmit(movieSearchValue);
  };

  /**
   * @desc Method to change the state value if the search input is modified
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  onMovieSearchChange = event => {
    const movieSearchValue = event.target.value;
    this.setMovieSearchValue(movieSearchValue);
  };

  /**
   * @desc Method to update the state with the input value
   * @version 1.0.0
   * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
   */
  setMovieSearchValue = movieSearchValue => {
    this.setState({ movieSearchValue });
  };

  render() {
    const { onFormSubmit, onMovieSearchChange } = this;

    return (
      <form onSubmit={onFormSubmit}>
        <FormControl>
          <InputLabel htmlFor="movie-input">Search Movie</InputLabel>{" "}{/* The label for the search input */}
          <Input
            id="movie-input"
            aria-describedby="movie-helper-text"
            onChange={onMovieSearchChange}
          />
        </FormControl>
        <IconButton type="submit" color="primary">
          <SearchIcon />
        </IconButton>
      </form>
    );
  }
}

export default Form;
