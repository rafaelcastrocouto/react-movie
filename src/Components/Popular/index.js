import React, { useState, useEffect } from 'react';
import Loading from './../Loading';
import Thumb from './../Thumb';
import Pagination from './../Pagination';
import {useParams} from "react-router-dom";

function Popular(props) {

  const page = useParams().page || 1;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const valid = (page >= 1 && page <= 500);
  
  useEffect(()=> {
    async function fetchPopular () {
      
      const key = process.env.REACT_APP_API_KEY;
      const url = new URL('https://api.themoviedb.org/3/movie/popular?api_key='+key+'&language=en-US&page='+page);

      const res = await fetch(url);
      const newdata = await res.json();

      //console.log('Popular', newdata)

      setLoading(false);
      setData(newdata);

    };

    if (valid) fetchPopular();

  }, [valid, page]);


  function popularItem () {
    if (valid && data.results) {
      if (props.size) return data.results.slice(props.size).map(Thumb);
      else return data.results.map(Thumb);
    } else {
      return (
        <p>No results for page {page}</p>
      );
    }
  }
  
  if (loading && valid) return Loading();
  
  return (
    <> 
      { !props.size ? Pagination('page', page, data.total_pages || 1) : '' }
      <ul className='popular'>{popularItem.bind(this)()}</ul>
      { !props.size ? Pagination('page', page, data.total_pages || 1) : '' }
    </>
  );
  
}

export default Popular;