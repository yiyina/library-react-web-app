import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Import Link
import { useGlobalContext } from '../../context.js';
import Book from "./Book.js";
import Loading from "../Loader/Loader.js";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

const BookList = () => {
  const { searchContent } = useParams();
  const navigate = useNavigate();
  const { books, loading, resultTitle } = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });

  if (loading) return <Loading />;

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
            {booksWithCovers.slice(0, 30).map((item, index) => {
              return (
                <div key={index} className='col-md-3'>
                  <Book {...item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookList;
