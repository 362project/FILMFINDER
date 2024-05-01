import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RandomMainContent.css';

function RefreshButton({ onRefresh }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = async () => {
        setIsLoading(true);
        try {
            await axios.get('http://127.0.0.1:5000/random');
            // Call the onRefresh function passed from the parent component
            onRefresh();
        } catch (error) {
            console.error('Error refreshing:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleRefresh}
            disabled={isLoading}
            style={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: 'white',
                width: '200px',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                fontSize: '14px',
                margin: '4px auto',
                cursor: 'pointer',
                borderRadius: '50px',
                marginTop: '20px',
            }}
        >
            <strong>{isLoading ? 'Loading...' : 'Randomize'}</strong>
        </button>
    );
}

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
        <main className="main">
            <RefreshButton onRefresh={fetchRandomMovie} />

            {randomMovie.map(movie => (
                <div className="movie-name" key={movie._id}>
                    <div className="movie-header">
                        <h1 className="movie-title">
                            <strong>{movie.title}</strong>
                        </h1>
                        <img
                            className="star-img"
                            src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Yellow_Star_with_rounded_edges.svg"
                            alt="Flowers in Chania"
                        />
                        <h1 className="rating">
                            Rating{' '}
                            <span style={{ color: 'white' }}>{movie.votes}</span>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px' }}>
                                /5
                            </span>
                        </h1>
                    </div>
                    <div className="movie-year">
                        {movie.year} · {movie.runtime}
                    </div>
                    <div className="movie">
                        <img className="poster" src={movie.poster_path} alt={movie.title} />

                        {movie.trailer_key !== '0' ? (
                            <iframe
                                className="youtube-trailer"
                                src={`https://www.youtube.com/embed/${movie.trailer_key}?si=6zJaZD8X8Cg04urK`}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                            ></iframe>
                        ) : (
                            <p className="no-trailer">No trailer available</p>
                        )}
                    </div>
                    <div className="genres">
                        {movie.genres_list.map((genre, index) => (
                            <h1 key={index}>{genre}</h1>
                        ))}
                    </div>
                    <div className="movie-details">
                        <p className="synopsis">{movie.synopsis}</p>
                    </div>
                    <div className="Cast">
                        <strong>Cast</strong>
                    </div>
                    <hr width="100%" size="2" />
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
                    <div className="crew-title">
                        <strong>Crew</strong>
                    </div>
                    <hr width="100%" size="2" />
                    <div className="crew">
                        {movie.director.map((direct, index) => {
                            const nameDisplayed = movie.director.slice(0, index).some(d => d.name === direct.name);
                            if (!nameDisplayed) {
                                return (
                                    <h1 className="crew-wrapper" key={index}>
                                        <div className="crew-member">
                                            <div className="wrapper">
                                                <img
                                                    src={direct.picture}
                                                    alt={direct.name}
                                                    style={{ width: '100px', height: '150px' }}
                                                />
                                            </div>
                                            <ul style={{ listStyleType: 'none' }}>
                                                <li className="crew-name">{direct.name}</li>
                                                <li className="crew-job">{direct.job}</li>
                                            </ul>
                                        </div>
                                    </h1>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            ))}
        </main>
    );
}

export default MainContent;