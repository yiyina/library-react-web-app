// HomeBookRecommend.js
import React from 'react';
import { useGlobalContext } from '../../context.js';
import Book from '../BookList/Book.js';
import Loading from "../Loader/Loader.js";
import coverImg from "../../images/cover_not_found.jpg";
import "./HomeBookRecommend.css";

const HomeBookRecommend = () => {
  const { books, loading } = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => ({
    ...singleBook,
    id: singleBook.id.replace("/works/", ""),
    cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
  }));

  if (loading) return <Loading />;

  return (
    <section className="home-booklist">
      <div className='container'>
        <div className='booklist-content'>
          <div className='row'>
            {booksWithCovers.slice(0, 4).map((item, index) => (
              <div key={index} className='col-md-3'>
                <Book {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeBookRecommend;
