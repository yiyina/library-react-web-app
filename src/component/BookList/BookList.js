import React from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context.js';
import Book from "./Book.js";
import Loading from "../Loader/Loader.js";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const { searchContent } = useParams();
  const {books, loading, resultTitle} = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });

  if(loading) return <Loading />;

  return (
    <section className='booklist'>
      
      <div className='container'>
        <div className='section-title'>
          <h2>{`Search Results for "${decodeURIComponent(searchContent)}"`}</h2>
          
        </div>
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