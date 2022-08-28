import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_MOVIES = 'movies-db-app/movies.redux.js/FETCH_MOVIES';
const POST_LIKES = 'movies-db-app/movies.redux.js/POST_LIKES';
const GET_LIKES = 'movies-db-app/movies.redux.js/GET_LIKES';
const BASE_URL = 'https://yts.mx/api/v2/list_movies.json?genre=animation&limit=50&sort_by=download_count&minimum_rating=7';
const LIKE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/nWHbxSiuSFC7nMEf03JD/likes/';

const initialState = [];

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MOVIES}/fulfilled`:
      return action.payload;
    case `${POST_LIKES}/fulfilled`:
      return state.map((movie) => {
        if (movie.id === action.payload.id) {
          return {
            ...movie,
            likes: movie.likes + 1,
          };
        } return movie;
      });
    case `${GET_LIKES}/fulfilled`:
      return state.map((movie) => {
        const movieLikes = action.payload.find((like) => like.item_id === movie.id);
        if (movieLikes) {
          return {
            ...movie,
            likes: movieLikes.likes,
          };
        } return {
          ...movie,
          likes: 0,
        };
      });
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

// Post Like to api
export const postLike = createAsyncThunk(POST_LIKES, async (id) => {
  const response = await axios.post(LIKE_URL, { item_id: id });
  return response;
});

// get likes from api
export const getLike = createAsyncThunk(GET_LIKES, async () => {
  const response = await axios.get(LIKE_URL);
  console.log(response.data.likes);
  return response.data.likes;
});

export const selectAllMovies = (state) => state.movies;
export default moviesReducer;
