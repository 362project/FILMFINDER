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
    <h2 className='title'>Related Movies</h2>
    <div className="movie-list">
      {currentMovies.map(movie => (
        <div key={movie._id} className="movie">
          <h3>{movie.title} </h3>
          <h2 class="year">{movie.year} · {movie.runtime} · {movie.votes}/5</h2>
          <img src={movie.poster_path} alt={movie.title} />
          <div className='movie-details'>
            {/* <p><strong>Rating</strong> {movie.votes}/5</p> */}
            <p> {movie.synopsis}</p>
            <div className="genres">
                      {movie.genres_list.map((genre, index) => (
                          <h1 key={index}>{genre}</h1>
                      ))}
                  </div>
            
            <div className="Actors">
                      {movie.actors.map((actor, index) => {
                          const nameDisplayed = movie.actors.slice(0, index).some(d => d.name === actor.name);
                          if (!nameDisplayed) {
                              return (
                                  <h1 className="actor-wrapper" key={index}>
                                      <div className="actor-member">
                                          <div className="poster-wrapper">
                                              <img
                                                  src={actor.picture}
                                                  alt={actor.name}
                                                  style={{ width: '100px', height: '150px' }}
                                              />
                                          </div>
                                          <ul className="actor-list" style={{ listStyleType: 'none' }}>
                                              <li className="actor-name">{actor.name}</li>
                                              <li className="actor-character">{actor.character}</li>
                                          </ul>
                                      </div>
                                  </h1>
                              );
                          }
                          return null;
                      })}
                  </div>
          </div>
        </div>
      ))}
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
  </main>
  );
}

export default MainContent;
