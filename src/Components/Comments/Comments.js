/* eslint-disable */
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { selectAllMovies, fetchMovies, postComment } from '../../redux/movies.redux';
import './comments.css';
import { useState } from 'react';

const Comments = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const movies = useSelector(selectAllMovies);
  const dispatch = useDispatch();
  const { id } = useParams();
  const foundMovie = movies.find((movie) => Number(movie.id) === Number(id))

  useEffect(() => {
    dispatch(fetchMovies());
  }, [movies, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      item_id: foundMovie.id,
      name,
      comment,
    };
    dispatch(postComment(newComment));
    setName('');
    setComment('');
  };



  return (
    <div className="movieComments">
      <NavLink to="/" className="closeButton">
      <AiOutlineClose className="close_me" />
      </NavLink>
      <h3 className="commentTitle">{foundMovie.title} {Number(foundMovie.id)}</h3>
      <img src={foundMovie.image} className="commentImage" alt={foundMovie.title} />
      <div className="contain">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th colSpan="2" scope="col">MOVIE DATA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Rating:</th>
            <td>{foundMovie.rating} / 10</td>
          </tr>
          <tr>
            <th scope="row">Likes:</th>
            <td>{foundMovie.likes} Likes</td>
          </tr>
          <tr>
            <th scope="row">Release Date:</th>
            <td>{foundMovie.year}</td>
          </tr>
          <tr>
            <th scope="row">Genres:</th>
            <td>{foundMovie.genres}</td>
          </tr>
          <tr>
            <th scope="row">URL:</th>
            <td>{foundMovie.url}</td>
          </tr>
          <tr>
            <th scope="row">Summary:</th>
            <td>{foundMovie.summary}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="comments_record">Movie Comments</div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name: " value={name} onChange={(e) => setName(e.target.value)} />
        <textarea type="text" rows="4" cols="50" placeholder="Your insights: " value={comment} onChange={(e) => setComment(e.target.value)} />
        <button className="submit" type="submit">Comment</button>
      </form>
      </div>
  );
};

  export default Comments;


