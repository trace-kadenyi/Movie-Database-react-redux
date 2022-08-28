import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_MOVIES = 'movies-db-app/movies.redux.js/FETCH_MOVIES';
const BASE_URL = 'https://yts.mx/api/v2/list_movies.json?genre=animation&limit=50&sort_by=download_count&minimum_rating=7';

const initialState = [];

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MOVIES}/fulfilled`:
      return action.payload;
    default:
      return state;
  }
};
// restructured to use async thunk
const restructredMovies = (data) => {
  const moviesContainer = [];
  data.data.movies.forEach((element) => {
    const movie = {};
    movie.id = element.id;
    movie.title = element.title;
    movie.image = element.medium_cover_image;
    movie.year = element.year;
    movie.rating = element.rating;
    movie.genres = element.genres;
    movie.summary = element.summary;
    movie.url = element.url;
    moviesContainer.push(movie);
  });
  return moviesContainer;
};
// fetch movies from yts api
export const fetchMovies = createAsyncThunk(FETCH_MOVIES,
  async () => {
    const { data } = await axios.get(BASE_URL);
    return restructredMovies(data);
  });

export const selectAllMovies = (state) => state.movies;
export default moviesReducer;
