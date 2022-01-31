import React, {useContext} from "react";
import styled, { css } from 'styled-components';

import ExpandableFilter from "../../components/expandablefilter";
import SearchBar from "../../components/searchbar";

import SearchIcon from "../../images/search-icon-yellow.png";
import YearIcon from "../../images/year-icon.png";


export default function SearchFilters({ genres, ratings, languages, searchMovies, searchMoviesByAttributes, addictional=false }) {


  return (
    <FiltersWrapper>
      <SearchFiltersCont className="search_inputs_cont" marginBottom>
        {
          !addictional &&
            <SearchBar
              id="keyword_search_input" 
              type="text"
              icon={{ src: SearchIcon, alt: 'Magnifying glass' }} 
              placeholder="Search for movies"
              onChange={searchMovies}
            />
        }
        
        <SearchBar
          id="year_search_input" 
          type="number"
          icon={{ src: YearIcon, alt: 'Calendar icon' }} 
          placeholder="Year of release"
          onChange={searchMovies}
        />
      </SearchFiltersCont>
      <SearchFiltersCont>
        <CategoryTitle>Movies</CategoryTitle>
        {/* TODO: Implement a component called "ExpandableFilter" and re-use it for all filter categories */}

        <ExpandableFilter arry={genres} label="Select genre(s)" onChange={searchMoviesByAttributes} />
        <ExpandableFilter arry={ratings} label="Select min. vote" onChange={searchMoviesByAttributes} />
        <ExpandableFilter arry={languages} label="Select language" onChange={searchMoviesByAttributes} />
        
      </SearchFiltersCont>
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  position: relative;

  
`

const SearchFiltersCont = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  transition: all .3s ease-in-out;

  .search_bar_wrapper:first-child {
    margin-bottom: 15px;
  }
  
  ${props => props.marginBottom && css`
    margin-bottom: 15px;
  `}
`

const CategoryTitle = styled.h3`
  margin: 0 0 15px 0;
`