import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecommendedMainContent.css';

function MainContent() {
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const genre = urlParams.get('genre');
                const year = urlParams.get('year');
                const rating = urlParams.get('rating');

                console.log('Received genre:', genre);
                console.log('Received year:', year);
                console.log('Received rating:', rating);

                const request = {
                    genre: genre ,
                    year: year,
                    rating: rating
                };

                const response = await axios.post('http://127.0.0.1:5000/recommendation', request);

                console.log('Received response:', response.data); // Log the backend's response

                setSearchResults(response.data.results); // Assuming the response contains a 'results' field
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, []); // Run once on component mount

    return (
        <main>
            <h2 className='title'>Search Results</h2>
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
