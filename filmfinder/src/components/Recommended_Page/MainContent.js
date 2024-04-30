import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecommendedMainContent.css';

function MainContent() {
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm) {
            fetchSearchResults();
        }
    }, [searchTerm]);

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get(`/searchMovieTitle?title=${searchTerm}`);
            setSearchResults(response.data); // Set the search results
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <main>
            <h2 className='title'>Search Results for: {searchTerm}</h2>
            <div className="movie-list">
                {searchResults ? (
                    searchResults.map(movie => (
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
        </main>
    );
}

export default MainContent;
