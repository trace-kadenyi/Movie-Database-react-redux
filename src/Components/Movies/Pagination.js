import React from 'react';
import PropTypes from 'prop-types';

import './movies.css';

const Pagination = ({
  totalMovies,
  moviesPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i += 1) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  totalMovies: PropTypes.string.isRequired,
  moviesPerPage: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
export default Pagination;
