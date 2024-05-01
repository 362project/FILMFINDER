import React from 'react';
import './main.css';
import Logo from '../../logo-no-background.png';

function MainContent() {
    return (
        <main>            
            <div className="logo">
                <img src={Logo} alt="Logo" className="logo" />
            </div> 
        </main>
    );
}

export default MainContent;