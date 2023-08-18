import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import "./BookList.css";

const Book = (props) => {
    const { cover_img, id, title, author, edition_count, first_publish_year } = props; // Destructure props
    const location = useLocation();
    const [isLiked, setIsLiked] = useState(false);
    const { searchContent } = useParams();

    const linkTo = location.pathname.startsWith('/home') ? `/home/${id}` : `/search/${searchContent}/${id}`;

    const toggleLike = () => {
        setIsLiked(prevLiked => !prevLiked);
    }

    return (
        <div className='book-item flex flex-column flex-sb'>
            <div className='book-item-img'>
                <div className='img-wrapper'>
                    <Link to={linkTo}>
                        <div className='book-item-info-item title fw-7 fs-18'>
                            <img src={cover_img} alt="cover" />
                        </div>
                    </Link>
                </div>
            </div>

            <div className='book-item-info text-center'>
                <Link to={`/home/${id}`} {...props}>
                    <div className='book-item-info-item title fw-7 fs-18'>
                        <span>{title}</span>
                    </div>
                </Link>

                <div className='book-item-info-item author fs-15'>
                    <span className='text-capitalize fw-7'>Author: </span>
                    <span>{author ? author.join(", ") : "Unknown Author"}</span>
                </div>

                <div className='book-item-info-item edition-count fs-15'>
                    <span className='text-capitalize fw-7'>Total Editions: </span>
                    <span>{edition_count}</span>
                </div>

                <div className='book-item-info-item publish-year fs-15'>
                    <span className='text-capitalize fw-7'>First Publish Year: </span>
                    <span>{first_publish_year}</span>
                </div>

                {/* Optional Like Button */}
                {/* <div className='like-count' onClick={toggleLike}>
                    <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    <span className='like-text' style={{ marginLeft: '5px' }}>{book.likeCount || 0}</span>
                </div> */}
            </div>
        </div>
    );
}

export default Book;
