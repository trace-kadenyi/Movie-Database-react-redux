import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_MOVIES = 'movies-db-app/movies.redux.js/FETCH_MOVIES';
const POST_LIKES = 'movies-db-app/likes.redux/POST_LIKES';
const ADD_LIKE = 'movies-db-app/likes.redux/ADD_LIKE';
const GET_LIKES = 'movies-db-app/likes.redux/GET_LIKES';
const LIKE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/nWHbxSiuSFC7nMEf03JD/likes/';

const initialState = [];

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MOVIES}/fulfilled`:
      return action.payload.likes;
    case ADD_LIKE:
      return state.map((movie) => (movie.item_id === action.payload
        ? { ...movie, likes: movie.likes += 1 } : movie));
    case `${GET_LIKES}/fulfilled`:
      return action.payload;
    default:
      return state;
  }
};

// Post like to api
export const postLike = createAsyncThunk(POST_LIKES,
  async (id) => {
    await axios.post(LIKE_URL, { item_id: id });
    return id;
  });

export const addLike = (id) => ({
  type: ADD_LIKE,
  payload: id,
});

export default likeReducer;
