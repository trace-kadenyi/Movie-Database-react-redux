/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { postLike } from '../../redux/movies.redux';
import { NavLink } from 'react-router-dom';
import './movies.css';

const Movie = ({
  id, title, image, likes,
}) => {
  const dispatch = useDispatch();

  // Post like to api
  const handleLike = () => {
    dispatch(postLike(id));
  };


  return (
    <li className="mb-3">
      <div className="mb-3 mainList">
        <img src={image} className="movie_image" alt={title} />
        <h3 className="movie_title my-2">{title}</h3>
        { likes > 0 ? (<FaHeart className="heart liked" onClick={handleLike} />)
          : (<FaHeart className="heart" onClick={handleLike} />)}
        { likes === 1 ? (
          <span className="likes">
            {likes}
            {' '}
            like
          </span>
        )
          : (
            <span className="likes">
              {likes}
              {' '}
              likes
            </span>
          )}
      </div>
      <button id={id} type="button" className="commentBox">
      <NavLink to={`comments/${id}`} className="commentLink">
      Comment
      </NavLink>
      </button>
    </li>
  );
};

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};

export default Movie;
