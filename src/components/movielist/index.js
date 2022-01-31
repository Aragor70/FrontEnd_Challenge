import React from "react";
import styled from 'styled-components';

import MovieItem from '../movieitem';

export default class MovieList extends React.Component {

  render () {
    const { movies, genres } = this.props;

    return (
      <MoviesWrapper>
        { movies.map((movie, index) => <MovieItem key={index} movie={movie} genres={genres} />)}
      </MoviesWrapper>
    )
  }
}

const MoviesWrapper = styled.div`
  position: relative;
  width: 100%;
`