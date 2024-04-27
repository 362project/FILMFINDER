import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/navbar.css';

function Header() {
    return (
        <header>
            <div class = "topnav" id="myTopnav">
            <Link to="/" className="active">Home</Link>

            <div class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Movies</a>
                <div class="dropdown-content">
                    <a href="#">Recommended</a>
                    <a href="#">Random</a>
                    <a href="#">Most Popular</a>
                </div>
            </div>

            <Link to="/about">About</Link>

            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                <i class="fa fa-bars"></i>
            </a>

                </div>
        </header>
    );
}

export default Header;