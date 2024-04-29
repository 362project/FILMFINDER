import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const visiblePages = 6; // Number of visible pages
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button key={i} onClick={() => onPageChange(i)} className={i === currentPage ? 'active' : ''}>
        {i}
      </button>
    );
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>
          Prev
        </button>
      )}
      {pages}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
