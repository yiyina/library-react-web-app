import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./BookList.css";

const Book = (book) => {
  const [isLiked, setIsLiked] = useState(false);
  const { searchContent } = useParams();

  const toggleLike = () => {
    setIsLiked(prevLiked => !prevLiked);
  }
  console.log('Book Object:', book); // Log the book object
  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        <div className='img-wrapper'>
          <Link to={`/search/${searchContent}/${book.id}`}>
            <div className='book-item-info-item title fw-7 fs-18'>
              <img src={book.cover_img} alt="cover" />
            </div>
          </Link>
        </div>
      </div>
      <div className='book-item-info text-center'>
        <Link to={`/book/${book.id}`} {...book}>
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{book.title}</span>
          </div>
        </Link>

        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Author: </span>
          <span>{book.author ? book.author.join(", ") : "Unknown Author"}</span>
        </div>

        <div className='book-item-info-item edition-count fs-15'>
          <span className='text-capitalize fw-7'>Total Editions: </span>
          <span>{book.edition_count}</span>
        </div>

        <div className='book-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>First Publish Year: </span>
          <span>{book.first_publish_year}</span>
        </div>
        
        <div className='like-count' onClick={toggleLike}>
          <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          <span className='like-text' style={{ marginLeft: '5px' }}>{book.likeCount || 0}</span>
        </div>
      </div>
    </div>

  )
}

export default Book;
