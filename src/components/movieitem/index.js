import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import { lightBackground, primaryColor } from "../../colors";

export default function MovieItem ({ movie, genres }) {


  const [itemGenders, setItemGenres] = useState([])

  useEffect(() => {

    const filtredGenres = genres?.filter((element) => movie?.genre_ids?.indexOf(element?.id) >= 0)

    setItemGenres(filtredGenres)

  }, [movie, genres])

  return (
    
    // TODO: Complete the MovieItem component
    <MovieItemWrapper>
      <LeftCont>
        <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} width="100%" alt="poster" />
      </LeftCont>
      <RightCont>
        <Title>
          
          <h2>{movie.title}</h2>
          <div>
            <Batch>
            {movie.vote_average}
            </Batch>
          </div>
        </Title>
        <Genres>
          {itemGenders.map((element, index)=> <span key={element.id}>{element.name} {index < itemGenders.length - 1 ? " | ": ""} </span> )}
        </Genres>
        <Overview>
          {movie.overview}
        </Overview>
        <ReleaseDate>
          {movie.release_date}
        </ReleaseDate>
        
      </RightCont>
    </MovieItemWrapper>
  )
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin: 15px 0;

  display: grid;
  grid-template-columns: 130px calc(100% - 20px - 130px);
  grid-column-gap: 20px;
`

const LeftCont = styled.div`
  display: inline-block;
`

const RightCont = styled.div`
  display: inline-block;
  position: relative;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  
  display: grid;
  grid-template-columns: calc(100% - 27px) 27px; 

  h2 {
    margin-top: 0;
    font-size: 1.4;
    font-weight: 900;
  }
`;
const Genres = styled.p`
  display: inline-block;
  color: ${primaryColor};
  font-weight: bolder;
  margin: 0;
`;
const Overview = styled.p`
  display: inline-block;
  margin: 20px 0 0 0;
  font-size: 14px;
`;
const ReleaseDate = styled.p`
  display: inline-block;
  margin: 20px 0 0 0;
  font-size: 14px;
  color: ${primaryColor};
`;
const Batch = styled.span`
  
  background: ${primaryColor};
  color: ${lightBackground};
  font-weight: normal;
  padding: 0.75px 4.75px;
  border-radius: 3.5px;
  font-size: 0.85em;
  text-align: center;
  min-width: max-content;
  float: right;
`;
