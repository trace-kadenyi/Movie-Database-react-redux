import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import moviesReducer from './movies.redux';
import likeReducer from './likes.redux';

const rootReducer = combineReducers({
  movies: moviesReducer,
  likes: likeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
