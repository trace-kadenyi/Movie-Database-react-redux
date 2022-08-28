import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const POST_LIKES = 'movies-db-app/movies.redux.js/POST_LIKES';
const GET_LIKES = 'movies-db-app/movies.redux.js/GET_LIKES';
const LIKE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/nWHbxSiuSFC7nMEf03JD/likes/';

const initialState = [];

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
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


// Post Like to api
export const postLike = createAsyncThunk(POST_LIKES, async (id) => {
  const response = await axios.post(LIKE_URL, { item_id: id });
  return response;
});

// get likes from api
export const getLike = createAsyncThunk(GET_LIKES, async () => {
  const response = await axios.get(LIKE_URL);
  console.log(response.data);
  return response.data;
});

export const selectAllLikes = (state) => state.likes;
export default likesReducer;
