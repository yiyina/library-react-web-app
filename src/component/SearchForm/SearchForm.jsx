import React, { useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context.js';
import Footer from '../Footer/Footer.js';
import './SearchForm.css';

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempSearchTerm = searchText.current.value.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, '').length === 0) {
      setSearchTerm('the lost world');
      setResultTitle('Please Enter Something ...');
    } else {
      setSearchTerm(searchText.current.value);
    }

    navigate(`/search/${encodeURIComponent(tempSearchTerm)}`); // 传递搜索内容作为路径参数
  };

  return (
    <div>
      <div className="search-form-bg">
        <div className="overlay"></div> {/* Add the overlay div */}
        <div className="container">
          <div className="search-form-content">
            <form className="search-form" onSubmit={handleSubmit}>
              <div className="search-prompt">
                Start to Search a Book
              </div>
              <div className="search-form-elem bg-white">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a book title..."
                  ref={searchText}/>
                <button type="submit" className="flex flex-c">
                  <FaSearch className="text-purple" size={24} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SearchForm;
