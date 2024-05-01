import React from 'react';
import './main.css';
import Logo from '../../logo-no-background.png';

function MainContent() {
    return (
        <main>            
            <div className="logo">
                <img src={Logo} alt="Logo" className="logo" />
            </div> 
            <div className='summary'>FilmFinder is a user-friendly movie recommendation website with a simplistic design that caters to those who want to find the right entertainment. Our platform utilizes an algorithm that takes in user preferences to personalize the movie recommendation for each user. Our website delivers suggestions, ensuring a quick and seamless browser experience.	Users have the option to either fill out a form, specifying their desired genres, and release dates, or even search for similar movies based on partial names of films they've watched. Alternatively, for those looking for what is trending, simply pressing the popular button in the navigation bar will display a list of popular movies, ready for immediate viewing. On the other hand, if you are feeling adventurous you could press the random button in the navigation bar and it will display a random movie. </div>
        </main>
    );
}

export default MainContent;