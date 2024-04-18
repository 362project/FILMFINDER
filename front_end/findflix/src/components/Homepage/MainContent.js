import React from 'react';
import './styles/main.css';
import Logo from './styles/logo-no-background.png';

function MainContent() {
    return (
        <main>            
            
            <div className="logo">
                <img src={Logo} alt="Logo" className="logo" />
            </div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <form class="search" action="action_page.php">
                <input type="text" placeholder="Search Movies..." name="search"></input>
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>

            <div className="button-container">
                <button className="button"><span>Get Recommended Movie</span></button>
                <button className="button"><span>Find Random Movie</span></button>
                <button className="button"><span>Most Popular</span></button>
            </div>
            
        </main>
    );
}

export default MainContent;
