import React from 'react';
import './Footer.css';

const contactEmails = ["yi.yina@bookstore.com", "mia.yan@bookstore.com"];

function Footer() {
    return (
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
    );
}

export default Footer;
