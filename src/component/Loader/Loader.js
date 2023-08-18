import React from 'react';
import { Spinner } from 'react-bootstrap'; // Import Bootstrap Spinner
import './Loader.css';

const Loader = () => {
  return (
    <div className='loader flex flex-c'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
