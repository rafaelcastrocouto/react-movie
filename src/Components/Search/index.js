import React, { useState, useEffect } from 'react';
import './index.css';
import Loading from './../Loading';
import Thumb from './../Thumb';
import Pagination from './../Pagination';
import {useParams, useLocation, useHistory} from "react-router-dom";

function Search () {
   
  const history = useHistory();

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

        //console.log('Search:', newdata);

        if (page > newdata.total_pages) {
          history.push('/search/'+newdata.total_pages+'?'+query);
        } else {
          setLoading(false);
          setData(newdata);
        }
      }
    };

    fetchSearch();

  }, [page, query, history]);

  function searchResults () {
    if (data.results && data.results.length) {
      return data.results.map(Thumb);
    } else {
      return 'No results for "' + query.split('=')[1] + '"';
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