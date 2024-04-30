import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecommendedMainContent.css';

function MainContent() {
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/recommendation', formData);
            setSearchResults(response.data.results); // Assuming the response contains a 'results' field
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <main>
            <h2 className='title'>Search Results for: {searchTerm}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Enter movie title"
                />
                <button type="submit">Search</button>
            </form>
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

