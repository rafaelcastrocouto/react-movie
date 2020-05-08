import React from 'react';

const Pagination = function (state) {
  let query = '';
  if (state.query) query = '?'+state.query;
  return (
    <p className='pagination'>
      { (state.data.page !== 1) ? <a href={'/'+state.name+'/'+(state.data.page-1)+query}>Previous</a> : '' } 
      Page {state.data.page} of {state.data.total_pages} 
      <a href={'/'+state.name+'/'+(state.data.page+1)+query}>Next</a>
    </p>
  );
}

export default Pagination;