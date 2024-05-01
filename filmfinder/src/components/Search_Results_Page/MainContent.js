import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import './SearchMainContent.css';
import { useLocation } from 'react-router-dom';

function MainContent() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const location = useLocation();
  const title = new URLSearchParams(location.search).get("title");

  useEffect(() => {
    fetchSearchResults();
  }, [currentPage]); 

  const fetchSearchResults = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/search', { title, page: currentPage });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = searchResults.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(searchResults.length / moviesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <h2 className='title'>Search Results</h2>
      <div className="movie-list">
        {currentMovies.map(movie => (
          <div key={movie._id} className="movie">
            <h3>{movie.title} ({movie.year})</h3>
            <img src={movie.poster_path} alt={movie.title} />
            <div className='movie-details'>
              <p><strong>Rating:</strong> {movie.rating}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Synopsis:</strong> {movie.synopsis}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </main>
  );
}

export default MainContent;
