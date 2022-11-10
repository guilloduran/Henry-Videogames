import React from 'react';
import './Pagination.scss';

function Pagination({
  videogamesPerPage,
  videogames,
  pagination,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(videogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className="pagination-container">
      {pageNumbers.length > 0 ? (
        <div
          className="left-arrow-container"
          onClick={() => {
            currentPage === 1
              ? setCurrentPage(Math.ceil(videogames / videogamesPerPage))
              : setCurrentPage(currentPage - 1);
          }}
        >
          <span> &lt; </span>
        </div>
      ) : (
        ''
      )}

      <nav>
        <ul>
          {pageNumbers &&
            pageNumbers.map((number, i) => (
              <li key={i}>
                <button
                  className={
                    currentPage === number
                      ? 'text-success'
                      : 'pagination-button'
                  }
                  onClick={() => pagination(number)}
                >
                  {number}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      {pageNumbers.length > 0 ? (
        <div
          className="right-arrow-container"
          onClick={() => {
            currentPage === Math.ceil(videogames / videogamesPerPage)
              ? setCurrentPage(1)
              : setCurrentPage(currentPage + 1);
          }}
        >
          <span> &gt; </span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Pagination;
