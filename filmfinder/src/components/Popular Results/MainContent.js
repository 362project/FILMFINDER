import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination'; // Import the Pagination component
import './ResultsMainContent.css';

function MainContent() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10; // Number of movies per page

  useEffect(() => {
    fetchPopularMovies();
  }, [currentPage]); // Trigger fetchPopularMovies whenever currentPage changes

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/popular');
      setPopularMovies(response.data.list || []); // Ensure popularMovies is always initialized as an array
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = popularMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(popularMovies.length / moviesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <h2 className='title'>Most Popular Movies</h2>
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





