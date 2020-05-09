import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Pagination = function (name, page, total, query) {
  page = Number(page);
  total = Number(total);
  if (page >= 1 && page <= total && total >= 1 && !isNaN(page) && !isNaN(total)){
    if (query) query = '?'+query;
    else query = '';
    return (
      <p className='pagination'>
        { (page > 1 && page <= total) ? <Link to={'/'+name+'/'+(Number(page)-1)+query}>Previous</Link> : '' } 
        Page {page} of {total} 
        { (page >= 1 && page < total ) ? <Link to={'/'+name+'/'+(Number(page)+1)+query}>Next</Link> : '' }
      </p>
    );
  }
}

export default Pagination;