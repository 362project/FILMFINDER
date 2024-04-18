import React from 'react';
import './styles/navbar.css';
import Logo from './styles/logo-no-background.png';

function Header() {
    return (
        <header>
            <div class = "topnav" id="myTopnav">

            <a href= "#home" class="active">Home</a>
            <a href= "#recommend" class="recommend">Recommend</a>
            <a href = "#random">Random</a>
            <a href="about">About</a>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                <i class="fa fa-bars"></i>
            </a>
                </div>
        </header>
    );
}

export default Header;
