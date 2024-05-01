import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RandomMainContent.css';

function MainContent() {
    const [randomMovie, setRandomMovie] = useState([]);

    useEffect(() => {
        fetchRandomMovie();
    }, []);

    const fetchRandomMovie = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/random');
            setRandomMovie(response.data); // Set the random movie data
        } catch (error) {
            console.error('Error fetching random movie:', error);
        }
    };

    return (
        <main>
            <h2 className='title'>Your Randomly Selected Movie:</h2>
            <div className="movie-list">
                {randomMovie.map(movie => (
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
        </main>
    );
}

export default MainContent;
