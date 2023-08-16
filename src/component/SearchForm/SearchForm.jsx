import React, { useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context.js';
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

    navigate('/book');
  };

  return (
    <div className="search-form-bg">
      <div className="overlay"></div> {/* Add the overlay div */}
      <div className="container">
        <div className="search-form-content">
          <form className="search-form" onSubmit={handleSubmit}>
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
  );
};

export default SearchForm;
