import React from 'react';
import './FormMain.css';

function MainContent() {
    return (
        <main>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <form class="search" action="action_page.php">
                <input type="text" placeholder="Search Movies..." name="search"></input>
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </main>
    );
}

export default MainContent;