import React from 'react';
import './FormMain.css';

function MainContent() {
    return (
        <main>
            <h1 className="title">Find A Film</h1>
            <p className='subtitle'>Select Genres:</p>
            <div className="container-wrapper">
                <label className="container">Action
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Adventure
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Animation
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Comedy
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Crime
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Documentary
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Drama
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Family
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Fantasy
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">History
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Horror
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Music
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Mystery
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Romance
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">TV Movie
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Fantasy
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">War
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Western
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
            </div>

            <p className='subtitle'>Release Year</p>
                <input classname="release-year" placeholder='Enter Year'></input>

            {/*Import stars*/}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <p className='subtitle'>Select a User Rating</p>

            <div className="user-rating">
                <label className="user-rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                    <input type="radio" name="radio"/>
                    <span className="checkmark2"></span>
                </label>
                <label className="user-rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                    <input type="radio" name="radio"/>
                    <span className="checkmark2"></span>
                </label>
                <label className="user-rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                    <input type="radio" name="radio" />
                    <span className="checkmark2"></span>
                </label>
                <label className="user-rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                    <input type="radio" name="radio" />
                    <span className="checkmark2"></span>
                </label>
                <label className="user-rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                    <input type="radio" name="radio" />
                    <span className="checkmark2"></span>
                </label>
            </div>
            <div className='btn'>
                <button class="submit-button">Submit Form</button>
            </div>
            

        </main>
    );
}

export default MainContent;
