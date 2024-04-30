import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import Logo from '../../logo-no-background.png';

function MainContent() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Redirect to the search page with the search term as a query parameter
        window.location.href = `/search?title=${encodeURIComponent(searchTerm)}`;
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <main>            
            <div className="logo">
                <img src={Logo} alt="Logo" className="logo" />
            </div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <form className="search" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search Movies..." 
                    name="search" 
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>

            <div className="button-container">
                <Link to="/form" className="button"><span>Get Recommended a Movie</span></Link>
                <Link to="/random" className="button"><span>Find a Random Movie</span></Link>
                <Link to="/popular" className="button"><span>Most Popular Movies</span></Link>
            </div>
            
        </main>
    );
}

export default MainContent; 
