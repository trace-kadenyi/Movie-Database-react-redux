import React from 'react';

import './pagination.css';

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

export default Pagination;
