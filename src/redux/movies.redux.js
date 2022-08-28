import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_MOVIES = 'movies-db-app/movies.redux.js/FETCH_MOVIES';
const BASE_URL = 'https://yts.mx/api/v2/list_movies.json?genre=animation&limit=50&sort_by=download_count&minimum_rating=7';
const LIKE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/nWHbxSiuSFC7nMEf03JD/likes/';

const initialState = [];

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MOVIES}/fulfilled`:
      return action.payload.movies;
    default:
      return state;
  }
};

// restructured to use async thunk
const restructredMovies = (moviesData) => {
  const restructredMoviesData = moviesData.map((movie) => ({
    id: movie.id,
    title: movie.title,
    image: movie.medium_cover_image,
    year: movie.year,
    rating: movie.rating,
    genres: movie.genres,
    summary: movie.summary,
    url: movie.url,
  }));
  return restructredMoviesData;
};
// fetch movies from yts api
export const fetchMovies = createAsyncThunk(FETCH_MOVIES,
  async () => {
    const { data } = await axios.get(BASE_URL);
    const likes = await axios.get(LIKE_URL);
    return {
      movies: restructredMovies(data.data.movies),
      likes: likes.data,
    };
  });

export default moviesReducer;
