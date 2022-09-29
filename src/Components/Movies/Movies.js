import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, selectAllMovies } from '../../redux/movies.redux';
import Movie from './Movie';
import Pagination from './Pagination';

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);
  const movies = useSelector(selectAllMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [movies, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = movies.slice(firstMovieIndex, lastMovieIndex);

  return (
    <div className="container-fluid">
      <ul className="d-flex gap-5 flex-wrap justify-content-center">
        {currentMovies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            likes={movie.likes}
          />
        ))}
        <Pagination
          totalMovies={movies.length}
          moviesPerPage={moviesPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </ul>
    </div>
  );
};

export default Movies;
