// MainContent.js

import React, { useState } from 'react';
import axios from 'axios';
import './FormMain.css';

function MainContent() {
    const [formData, setFormData] = useState({
        genre: [],
        year: '',
        rating: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const updatedGenres = checked ? [...formData.genre, value] : formData.genre.filter(genre => genre !== value);
            setFormData(prevState => ({
                ...prevState,
                genre: updatedGenres
            }));
        } else if (type === 'radio') {
            setFormData(prevState => ({
                ...prevState,
                rating: value
            }));
        } else {
            if (name === 'year') {
                setFormData(prevState => ({
                    ...prevState,
                    year: value
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams(formData);
            window.location.href = `/recommendation?${params.toString()}`;
        } catch (error) {
            console.error('Error redirecting:', error);
        }
    };

    return (
        <main>
            <h1 className="title">Find A Film</h1>
            <form onSubmit={handleSubmit}>
                <p className='subtitle'>Select Genres:</p>
                <div className="container-wrapper">
                    <label className="container">Action
                        <input
                            type="checkbox"
                            name="genre"
                            value="Action"
                            checked={formData.genre.includes("Action")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Adventure
                        <input
                            type="checkbox"
                            name="genre"
                            value="Adventure"
                            checked={formData.genre.includes("Adventure")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Animation
                    <input
                        type="checkbox"
                        name="genre"
                        value="Animation"
                        checked={formData.genre.includes("Animation")}
                        onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    </label>
                    <label className="container">Comedy
                        <input
                            type="checkbox"
                            name="genre"
                            value="Comedy"
                            checked={formData.genre.includes("Comedy")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Crime
                        <input
                            type="checkbox"
                            name="genre"
                            value="Crime"
                            checked={formData.genre.includes("Crime")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Documentary
                        <input
                            type="checkbox"
                            name="genre"
                            value="Documentary"
                            checked={formData.genre.includes("Documentary")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Drama
                        <input
                            type="checkbox"
                            name="genre"
                            value="Drama"
                            checked={formData.genre.includes("Drama")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Family
                        <input
                            type="checkbox"
                            name="genre"
                            value="Family"
                            checked={formData.genre.includes("Family")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Fantasy
                        <input
                            type="checkbox"
                            name="genre"
                            value="Fantasy"
                            checked={formData.genre.includes("Fantasy")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">History
                        <input
                            type="checkbox"
                            name="genre"
                            value="History"
                            checked={formData.genre.includes("History")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Horror
                        <input
                            type="checkbox"
                            name="genre"
                            value="Horror"
                            checked={formData.genre.includes("Horror")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Music
                        <input
                            type="checkbox"
                            name="genre"
                            value="Music"
                            checked={formData.genre.includes("Music")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Mystery
                        <input
                            type="checkbox"
                            name="genre"
                            value="Mystery"
                            checked={formData.genre.includes("Mystery")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Romance
                        <input
                            type="checkbox"
                            name="genre"
                            value="Romance"
                            checked={formData.genre.includes("Romance")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">TV Movie
                        <input
                            type="checkbox"
                            name="genre"
                            value="TV Movie"
                            checked={formData.genre.includes("TV Movie")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">War
                        <input
                            type="checkbox"
                            name="genre"
                            value="War"
                            checked={formData.genre.includes("War")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Western
                        <input
                            type="checkbox"
                            name="genre"
                            value="Western"
                            checked={formData.genre.includes("Western")}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>


                <p className='subtitle'>Release Year</p>
                <div className="release-year">
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        placeholder='Enter Year'
                        onChange={handleChange}
                    />
                </div>


                {/*Import stars*/}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                <p className='subtitle'>Select a User Rating</p>
                <div className="user-rating-container">
                    <label className="user-rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <input
                            type="radio"
                            name="rating"
                            value="5"
                            checked={formData.rating === "5"}
                            onChange={handleChange}
                        />
                        <span className="checkmark2"></span>
                    </label>
                    <label className="user-rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <input
                            type="radio"
                            name="rating"
                            value="4"
                            checked={formData.rating === "4"}
                            onChange={handleChange}
                        />
                        <span className="checkmark2"></span>
                    </label>
                    <label className="user-rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <input
                            type="radio"
                            name="rating"
                            value="3"
                            checked={formData.rating === "3"}
                            onChange={handleChange}
                        />
                        <span className="checkmark2"></span>
                    </label>
                    <label className="user-rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <input
                            type="radio"
                            name="rating"
                            value="2"
                            checked={formData.rating === "2"}
                            onChange={handleChange}
                        />
                        <span className="checkmark2"></span>
                    </label>
                    <label className="user-rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <input
                            type="radio"
                            name="rating"
                            value="1"
                            checked={formData.rating === "1"}
                            onChange={handleChange}
                        />
                        <span className="checkmark2"></span>
                    </label>
                </div>


                <div className='btn'>
                    <button type="submit" className="submit-button">Submit Form</button>
                </div>

            </form>
        </main>
    );
}

export default MainContent;