import React, { useState, useEffect } from 'react';
import Loading from './../Loading';
import Thumb from './../Thumb';
import Pagination from './../Pagination';
import {useParams, useLocation} from "react-router-dom";

function Search () {

  const page = useParams().page || 1;
  
  const search = useLocation().search || '';
  const params = new URLSearchParams(search);
  const query = params.toString();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const valid = (query.length > 6 && page >= 1 && page <= 500);

  useEffect(()=> {
    async function fetchSearch () {

      const key = process.env.REACT_APP_API_KEY;

        const url = new URL('https://api.themoviedb.org/3/search/movie?api_key='+key+'&page='+page+'&'+query);

        const res = await fetch(url);
        const newdata = await res.json();

        //console.log('Search:', newdata);

        setLoading(false);
        setData(newdata);
    };

    if (valid) fetchSearch();

  }, [valid, page, query]);

  function searchResults () {
    if (valid && data.results && data.results.length && page <= data.total_pages) {
      return data.results.map(Thumb);
    } else {
      return (
        <p>No results for "{query.split('=')[1]}" page {page}</p>
      );
    }
  }

  if (loading && valid) return Loading();

  return (
    <>
      {Pagination('search', page, data.total_pages || 1, query)}
      <ul className='searchResults'>{searchResults.bind(this)()}</ul>
      {Pagination('search', page, data.total_pages || 1, query)}
    </>
  );

}

export default Search;