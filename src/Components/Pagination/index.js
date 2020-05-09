import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Pagination = function (name, page, total, query) {
  if (total > 0){
    if (query) query = '?'+query;
    else query = '';
    return (
      <p className='pagination'>
        { (page > 1) ? <Link to={'/'+name+'/'+(Number(page)-1)+query}>Previous</Link> : '' } 
        Page {page} of {total} 
        { (page < total ) ? <Link to={'/'+name+'/'+(Number(page)+1)+query}>Next</Link> : '' }
      </p>
    );
  }
}

export default Pagination;