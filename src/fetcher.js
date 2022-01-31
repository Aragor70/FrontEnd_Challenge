import axios from 'axios';

// TODO: All of your API requests should be in this file
// See the README file for more information about the APIs you would need to use

const key = 'ddf9d2d2d28cb695d180f6ed1161e156'


export const getPopularMovies = async () => {

    const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + key);

    return res.data

}

export const getMoviesByKeywords = async (keywoard) => {

    const config = {
        params: {
            api_key: key,
            query: keywoard
        }
    }

    const res = await axios.get('https://api.themoviedb.org/3/search/movie', config);

    return res.data

}


export const getMoviesGenres = async () => {

    const config = {
        params: {
            api_key: key
        }
    }

    const res = await axios.get('https://api.themoviedb.org/3/genre/movie/list', config);

    return res.data

}
