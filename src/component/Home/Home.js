import React from 'react';
// import Nav from "../../nav.js";
import HomeBookRecommend from "../HomeBookRecommend/HomeBookRecommend.js";
import "./Home.css"; // Import your CSS file for styling

function Home() {
    return (
        <div className="home-container">
            {/* <Nav /> */}
            <div className="background-image">
                <div className="welcome-text">
                    <h1>Welcome to Our Bookstore!</h1>
                    <p>Your one-stop shop for all your reading needs.</p>
                </div>
            </div>
            <h2 className="recommended-heading">Recommended Books</h2>
            <HomeBookRecommend />
            <footer className="footer">
                <p>Contact us at: contact@bookstore.com</p>
                <p>Follow us on social media!</p>
            </footer>
        </div>
    );
}

export default Home;
