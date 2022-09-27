/* eslint-disable */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_MOVIES = 'movies-db-app/movies.redux.js/FETCH_MOVIES';
const POST_LIKES = 'movies-db-app/movies.redux.js/POST_LIKES';
const BASE_URL = 'https://yts.mx/api/v2/list_movies.json?genre=animation&limit=50&sort_by=download_count&minimum_rating=7';
const LIKE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/nWHbxSiuSFC7nMEf03JD/likes/';
const GET_COMMENTS = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/nWHbxSiuSFC7nMEf03JD/comments/`
const POST_COMMENTS = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/nWHbxSiuSFC7nMEf03JD/comments/';

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
    case `${POST_COMMENTS}/fulfilled`:
      return state.map((movie) => {
        if (movie.id === currentComment.item_id) {
          Object.assign(movie, { comments: currentComment.comment });
        }
        return movie;
      });
    default:
      return state;
  }
};

// restructured to use async thunk
const restructredMovies = (data, likes) => {
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
    const movieLikes = likes.find((like) => like.item_id === element.id);
    if (movieLikes) {
      moviesContainer.push({
        ...movie,
        likes: movieLikes.likes,
      });
    } else {
      moviesContainer.push({
        ...movie,
        likes: 0,
      });
    }
  });
  return moviesContainer;
};
// fetch movies from yts api
export const fetchMovies = createAsyncThunk(FETCH_MOVIES,
  async () => {
    const { data } = await axios.get(BASE_URL);
    const likes = await axios.get(LIKE_URL);
    return restructredMovies(data, likes.data);
  });

// Post Like to api
export const postLike = createAsyncThunk(POST_LIKES, async (id) => {
  const response = await axios.post(LIKE_URL, { item_id: id });
  return response.data;
});

// Post Comment to api
let currentComment;
export const postComment = createAsyncThunk(POST_COMMENTS, async (comment) => {
  const response = await axios.post(POST_COMMENTS, comment);
  currentComment = comment
  return response.data;
});

export const selectAllMovies = (state) => state.movies;
export default moviesReducer;
