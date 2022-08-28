import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { addLike, postLike } from '../../redux/likes.redux';
import './movies.css';

const Movie = ({ id, title, image }) => {
  const [likeAdded, setLikeAdded] = useState(false);
  const dispatch = useDispatch();
  // Post like to api
  const handleLike = () => {
    if (likeAdded) return;
    dispatch(addLike(id));
    dispatch(postLike(id));
    setLikeAdded(true);
  };

  // Get likes from redux
  const likes = useSelector((state) => state.likes);
  const movieLikes = likes.find((like) => like.item_id === id);

  return (
    <li className="mb-3">
      <div className="mb-3 mainList">
        <img src={image} className="movie_image" alt={title} />
        <h3 className="movie_title my-2">{title}</h3>
        <FaHeart className={likeAdded ? 'heart liked' : 'heart'} onClick={handleLike} />
        <span className="like">
          {movieLikes ? movieLikes.likes : 0}
          {' '}
          likes
        </span>
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
