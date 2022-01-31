import React from "react";
import styled from 'styled-components';

import * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import SearchBar from "../../components/searchbar";

import SearchIcon from "../../images/search-icon-yellow.png";
import FilterIcon from "../../images/filter-icon.png";


import {ScreenContext} from '../../store/store';
import { lightBackground, primaryColor } from "../../colors";


export default class Discover extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      keyword: '',
      year: 0,
      results: [],
      totalCount: 0,
      genreOptions: [],
      showfilters: false,
      ratingOptions: [
        { id: 7.5, name: 7.5 },
        { id: 8, name: 8 },
        { id: 8.5, name: 8.5 },
        { id: 9, name: 9 },
        { id: 9.5, name: 9.5 },
        { id: 10, name: 10 }
      ],
      languageOptions: [
        { id: 'GR', name: 'Greek' },
        { id: 'EN', name: 'English' },
        { id: 'RU', name: 'Russian' },
        { id: 'PO', name: 'Polish' }
      ]
    };
  }

  static contextType = ScreenContext;

  handleSelect = async (value) => {

    const movies = await fetcher.getMoviesByKeywords(value);

    this.setState({ results: movies.results, totalCount: movies.total_results })

  }
  
  searchMovies = async (target) => {

    if (target.id === 'year_search_input') {
      console.log(target.value)
      return this.searchMoviesByAttributes(null, target.value, target.id)

    } else if (target.id === 'keyword_search_input') {

      const movies = await fetcher.getMoviesByKeywords(target.value);
      console.log(movies)
      this.setState({ results: movies.results, totalCount: movies.total_results })

    }
    

  }

  searchMoviesByAttributes = async (id, value, label) => {
    
    const movies = await fetcher.getPopularMovies();

    if (!value) {
      
      return this.setState({ results: movies.results, totalCount: movies.total_results })
    }

    const filtredMovies = await movies.results.filter((element) => 
    
      label.includes('genre') ? element.genre_ids.indexOf(id) >= 0 :
      label.includes('vote') ? element?.vote_average >= id :
      label.includes('language') ? element?.original_language?.toLowerCase() === id?.toLowerCase() :

      label.includes('year') ? element?.release_date?.includes(value) : false

    )
    
    return this.setState({ results: filtredMovies, totalCount: filtredMovies.length })

  }

  // TODO: Write a function to preload the popular movies and all movie genres when page loads
  async componentDidMount() {

    const movies = await fetcher.getPopularMovies()
    
    const genres = await fetcher.getMoviesGenres()


    this.setState({
      results: movies.results, 
      totalCount: movies.total_results,
      genreOptions: genres.genres
    })
    

  }

  // TODO: Write a function to load the search results based on the keyword and year inputs

  render () {
    const { genreOptions, languageOptions, ratingOptions, totalCount, results } = this.state;

    const { screenSize } = this.context;

    return (
      <DiscoverWrapper style={screenSize <= 1023 ? {padding: '25px'} : {padding: '45px'}}>

        <TotalCount style={screenSize >= 1023 ? {paddingLeft: '300px'} : {}}>{totalCount} results</TotalCount>

        <MovieFilters className={screenSize >= 1023 ? 'visible' : ''}>
          <SearchFilters 
            genres={genreOptions} 
            ratings={ratingOptions}  
            languages={languageOptions}
            searchMovies={(keyword) => this.searchMovies(keyword)}
            searchMoviesByAttributes={this.searchMoviesByAttributes}
          />
        </MovieFilters>

        {
            screenSize <= 1023 &&
            <FilterNavTools>
              <SearchBar
                id="keyword_search_input" 
                type="text"
                icon={{ src: SearchIcon, alt: 'Magnifying glass' }} 
                placeholder="Search for movies"
                onChange={(keyword, year) => this.searchMovies(keyword, year)}
              />

              <div>
                <img src={FilterIcon} alt="filter-icon" onClick={() => this.setState({ showfilters: !this.state.showfilters})} />
              </div>
            </FilterNavTools>
          }
          {
            ((screenSize <= 1023) && (this.state.showfilters)) && 

            <MovieFilters className="visible" style={{ position: 'absolute', right: '25px', zIndex: 10, backgroundColor: lightBackground }}>
              <SearchFilters 
                genres={genreOptions} 
                ratings={ratingOptions}  
                languages={languageOptions}
                searchMovies={(keyword) => this.searchMovies(keyword)}
                searchMoviesByAttributes={this.searchMoviesByAttributes}
                addictional={((this.state.showfilters) && (screenSize <= 1023))}
              />
            </MovieFilters>
            
          }
        <MovieResults style={screenSize >= 1023 ? {width: 'calc(100% - 295px)', paddingLeft: '300px'} : {}}>
          
          <MovieList 
            movies={results || []}
            genres={genreOptions || []}
          />
        </MovieResults>
      </DiscoverWrapper>
    )
  }
}

const DiscoverWrapper = styled.main`
  display: block;
`

const MovieResults = styled.div`
  display: block;
`

const FilterNavTools = styled.div`
  display: grid;
  grid-template-columns: calc(100% - 50px - 1.4em) 50px;
  grid-column-gap: 1.4em;
  width: 100%;
  input {
    width: 100%;
  }
  div {
    border-bottom: 2.3px solid ${primaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`

const MovieFilters = styled.div`
  width: 280px;
  float: right;
  margin-top: 15px;

  display: none;

  &.visible 
  {
    display: block;
  }
`

const TotalCount = styled.span`
  display: block;
`