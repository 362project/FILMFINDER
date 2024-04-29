import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainContent() {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const fetchPopularMovies = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/popular');
            setPopularMovies(response.data.list || []); // Ensure popularMovies is always initialized as an array
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        }
    };

    return (
        <main>
            <h2>Popular Movies</h2>
            <div className="movie-list">
                {popularMovies.map(movie => (
                    <div key={movie._id} className="movie">
                        <h3>{movie.title} ({movie.year})</h3>
                        <img src={movie.poster_path} alt={movie.title} />
                        <p><strong>Rating:</strong> {movie.rating}</p>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Synopsis:</strong> {movie.synopsis}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default MainContent;




