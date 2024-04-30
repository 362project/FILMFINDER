import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination'; // Import your Pagination component
import './RecommendedMainContent.css';

function MainContent() {
    const [searchResults, setSearchResults] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const genre = urlParams.get('genre');
                const year = urlParams.get('year');
                const rating = urlParams.get('rating');

                const request = {
                    genre: genre,
                    year: year,
                    rating: rating
                };

                const response = await axios.post('http://127.0.0.1:5000/recommendation', request);

                setSearchResults(response.data || []); // Set searchResults with the response data
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, []); // Run once on component mount

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update the currentPage state when page changes
    };

    // Calculate the movies to display based on current page and movies per page
    const moviesPerPage = 10;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = searchResults ? searchResults.slice(indexOfFirstMovie, indexOfLastMovie) : [];

    return (
        <main>
            <h2 className='title'>Search Results</h2>
            <div className="movie-list">
                {currentMovies.length > 0 ? (
                    currentMovies.map(movie => (
                        <div key={movie._id} className="movie">
                            <h3>{movie.title} ({movie.year})</h3>
                            <img src={movie.poster_path} alt={movie.title} />
                            <div className='movie-details'>
                                <p><strong>Rating:</strong> {movie.rating}</p>
                                <p><strong>Release Date:</strong> {movie.release_date}</p>
                                <p><strong>Synopsis:</strong> {movie.synopsis}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
            <Pagination currentPage={currentPage} totalPages={Math.ceil((searchResults?.length || 0) / moviesPerPage)} onPageChange={handlePageChange} />
        </main>
    );
}

export default MainContent;
