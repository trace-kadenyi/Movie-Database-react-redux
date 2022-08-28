import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, selectAllMovies } from '../../redux/movies.redux';
import Movie from './Movie';

const Movies = () => {
  const movies = useSelector(selectAllMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [movies, dispatch]);

  return (
    <div className="container-fluid">
      <ul className="d-flex gap-5 flex-wrap justify-content-center">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            likes={movie.likes}
          />
        ))}
      </ul>
    </div>
  );
};

export default Movies;
