import React, { useState, useEffect } from 'react';
import Thumb from './../Thumb';
import Pagination from './../Pagination';
import {useParams} from "react-router-dom";

function Popular(props) {

  const page = useParams().page || 1;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //console.log('page',page)
  
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

    fetchPopular();

  }, [page]);


  function popularItem () {
    if (data.results) {
      return data.results.map(({ id, title, release_date, vote_count, popularity, backdrop_path }) => (
        <li key={id} /*style={{backgroundImage: 'url(https://image.tmdb.org/t/p/original'+backdrop_path+')'}}*/>
          {Thumb(id, title, release_date, vote_count, popularity)}
        </li>
      ))
    }
  }
  
  if (loading) return 'Loading';
  
  return (
    <>
      <h2>Popular</h2>  
      {Pagination('page', page, data.total_pages)}
      <ul className='popular'>{popularItem.bind(this)()}</ul>
      {Pagination('page', page, data.total_pages)}
    </>
  );
  
}

export default Popular;