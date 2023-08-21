import React from 'react';
import { Link } from 'react-router-dom';
import '../ProfileOther/ProfileOther.css';
import './RelatedBooks.css'

const RelatedBooks = ({ list, titleKey, authorKey, label }) => {
    return (
        <div className="follow-section">
            <h3>{label}</h3>
            <div className="book-items">
                {list.map((item, index) => (
                    <div key={index} className="related-book-item">
                        <div className="book-link">
                            <Link to={`/home/${item._id}`}>
                                <div>{item[titleKey]}</div>
                            </Link>
                            <div>Author: {item[authorKey].join(", ")}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RelatedBooks;
