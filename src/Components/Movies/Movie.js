import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { postLike, getLike } from '../../redux/movies.redux';
import './movies.css';

const Movie = ({ id, title, image }) => {
  const dispatch = useDispatch();
  // Get likes from api and store in redux
  // useEffect(() => {
  //   dispatch(getLike());
  // }, []);
  // dispatch(getLike());

  // Get likes from redux store

  // Post like to api
  const handleLike = () => {
    dispatch(postLike(id));
  };

  return (
    <li className="mb-3">
      <div className="mb-3 mainList">
        <img src={image} className="movie_image" alt={title} />
        <h3 className="movie_title my-2">{title}</h3>
        <FaHeart className="heart" onClick={handleLike} />
        <span className="like">0 likes</span>
      </div>
      <button type="button" className="commentBox">Comment</button>
    </li>
  );
};

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Movie;
