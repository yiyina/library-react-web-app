import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../Loader/Loader.js';
import coverImg from '../../images/cover_not_found.jpg';
import './HomeBookDetails.css';
import BookComments from '../BookComments/BookComments.js';

const URL = 'https://openlibrary.org/works/';

const HomeBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;

          const newBook = {
            description: description ? description.value : 'No description found',
            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places.join(', ')
              : 'No subject places found',
            subject_times: subject_times
              ? subject_times.join(', ')
              : 'No subject times found',
            subjects: subjects ? subjects.join(', ') : 'No subjects found',
          };

          setBook(newBook);
        } else {
          setBook(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    
    getBookDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="btn btn-light back-btn"
          onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left mr-2"></i>
          <span className="fs-18 fw-6">Go Back</span>
        </button>
        <div className="book-details-content grid">
          <div className="book-details-img d-none d-lg-block">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <h2 className="fw-bold fs-24">{book?.title}</h2>
            </div>
            <div className="book-details-item description">
              <p>{book?.description}</p>
            </div>
            <div className="book-details-item">
              <span className="fw-bold">Subject Places: </span>
              <span className="text-italic">{book?.subject_places}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-bold">Subject Times: </span>
              <span className="text-italic">{book?.subject_times}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-bold">Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
      <BookComments />
    </section>
  );
};

export default HomeBookDetails;
