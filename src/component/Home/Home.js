import React from 'react';
import { useSelector } from "react-redux";
import HomeBookRecommend from "../HomeBookRecommend/HomeBookRecommend.js";
import "./Home.css";

const contactEmails = ["yi.yina@bookstore.com", "mia.yan@bookstore.com"];

function Home() {
    const { currentUser } = useSelector((state) => state.user);
    
    return (
        <div className="home-container">
            <header className="background-image">
                <div className="welcome-text">
                    {currentUser && (
                        <div className="home-user-info">
                            <img 
                                src={currentUser.avatarUrl || '/default-avatar.png'} 
                                alt={currentUser.username} 
                                className="user-avatar" 
                            />
                            <div>Hi! {currentUser.username}</div>
                        </div>
                    )}
                    <h1>Welcome to the Book Search Web!</h1>
                    <p>Your one-stop searching for all your reading needs.</p>
                </div>
            </header>
            <section className="recommended-books">
                <h2 className="recommended-heading">Recommended Books</h2>
                <HomeBookRecommend />
            </section>
            <footer className="footer">
                <div className="footer-content">
                    <div className="contact-info">
                        <p>Contact us:</p>
                        {contactEmails.map((email, index) => (
                            <p key={index}><a href={`mailto:${email}`}>{email}</a></p>
                        ))}
                    </div>
                    <div className="social-media">
                        <p>Follow us on social media:</p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
