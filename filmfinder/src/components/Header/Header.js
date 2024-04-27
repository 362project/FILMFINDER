import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Header() {
    return (
        <header>
            <div className="topnav" id="myTopnav">
                <Link to="/" className="active">Home</Link>

                <div className="dropdown">
                    <Link to="#" className="dropbtn">Movies</Link>
                    <div className="dropdown-content">
                        <Link to="/form">Recommended</Link>
                        <Link to="/">Random</Link>
                        <Link to="/">Most Popular</Link>
                    </div>
                </div>

                <Link to="/about">About</Link>

                <a href="javascript:void(0);" className="icon">
                    <i className="fa fa-bars"></i>
                </a>
            </div>
        </header>
    );
}

export default Header;
