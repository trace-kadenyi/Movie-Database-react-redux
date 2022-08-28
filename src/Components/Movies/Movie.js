import React from 'react';
import { FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './movies.css';

const Movie = ({ title, image }) => (
  <li className="mb-3">
    <div className="mb-3 mainList">
      <img src={image} className="movie_image" alt={title} />
      <h3 className="movie_title my-2">{title}</h3>
      <FaHeart className="heart" />
      <span className="like">0 likes</span>
    </div>
    <button type="button" className="commentBox">Comment</button>
  </li>
);

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Movie;
