import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useGlobalContext } from '../../context.js';
import Book from "./Book.js";
import Loading from "../Loader/Loader.js";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

const BookList = () => {
  const { searchContent } = useParams();
  const navigate = useNavigate();
  const { books, loading } = useGlobalContext();

  const renderBooks = () => {
    if (loading) {
      return <Loading />;
    }

    const booksWithCovers = books.map((singleBook) => ({
      ...singleBook,
      id: singleBook.id.replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }));

    return booksWithCovers.slice(0, 30).map((item, index) => (
      <div key={index} className='col-md-3'>
        <Book {...item} />
      </div>
    ));
  };

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{`Search Results for "${decodeURIComponent(searchContent)}"`}</h2>
        </div>
        <button
          type="button"
          className="btn btn-light back-btn"
          onClick={() => navigate(`/search`)}>
          <i className="fas fa-arrow-left mr-2"></i>
          <span className="fs-18 fw-6">Back to search</span>
        </button>
        <div className='booklist-content'>
          <div className='row'>
            {renderBooks()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookList;
