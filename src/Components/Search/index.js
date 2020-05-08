import React, { useState, useEffect } from 'react';
import './index.css';
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
  
  useEffect(()=> {
    async function fetchSearch () {

      const key = process.env.REACT_APP_API_KEY;
      
      if (query.length > 6) {

        const url = new URL('https://api.themoviedb.org/3/search/movie?api_key='+key+'&page='+page+'&'+query);

        const res = await fetch(url);
        const newdata = await res.json();

        //console.log('Search:', data);

        setLoading(false);
        setData(newdata);
      }
    };

    fetchSearch();

  }, [page, query]);

  function searchResults () {
    if (data.results && data.results.length) {
      return data.results.map(({ id, title, release_date, vote_count, popularity, backdrop_path }) => (
        <li key={id}>
          {Thumb(id, title, release_date, vote_count, popularity)}
        </li>
      ))
    } else {
      return 'No results';
    }
  }

  if (loading) return Loading();

  return (
    <>
      {Pagination('search', page, data.total_pages, query)}
      <ul className='searchResults'>{searchResults.bind(this)()}</ul>
      {Pagination('search', page, data.total_pages, query)}
    </>
  );

}

export default Search;