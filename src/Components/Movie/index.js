import React, { useState, useEffect } from 'react';
import './index.css';
import Loading from './../Loading';
import { useLocation } from "react-router-dom";

function Movie () {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const pathname = useLocation().pathname;
  
  useEffect(()=> {
    async function fetchMovie () {

      var path = pathname.split('/');

      var id = path[path.length-1];
  

      if (!id) id = '1';

      const key = process.env.REACT_APP_API_KEY;

      const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+key+'&language=en-US';

      const res = await fetch(url);
      const newdata = await res.json();

      
      
      setLoading(false);
      setData(newdata);

      console.log('Movie:', newdata);
    }

    fetchMovie();

  }, []);

  function movieDesc () {
    if(data.id) {
      return (
        <>
          <h1 key={data.id}>{data.title}</h1>
          <span className="date">{data.release_date}</span>
          <p className="tagline">{data.tagline}</p>
          <div className="details">
            <img src={'https://image.tmdb.org/t/p/original'+data.poster_path} alt="Movie Poster"/>
            <p className="status">Status: {data.status}</p>
            <p className="overview">Overview: {data.overview}</p>
            { data.production_countries.length ? <p className="country">From: {data.production_countries.map((country) => { return country.name }).join(', ')}</p> : '' }
            { data.revenue ? <p className="revenue">{new Intl.NumberFormat('EN', { style: 'currency', currency: 'USD' }).format(Number(data.revenue))}</p> : '' }
            <p className="popularity">Popularity: {data.popularity}</p>
            { data.vote_count ? <p className="votes">{data.vote_count} votes {data.vote_average} average</p> : '' }
            { data.adult ? <p className="nsfw">NSFW</p> : ''}
            { data.production_companies.length ? <p className="companies">Companies: {data.production_companies.map((company) => { return company.name }).join(', ')}</p> : '' }
          </div>
        </>
      )
    }
  }

  return (
    <div className="movie">
      { loading ? Loading() : movieDesc() }
    </div>
  );
  
}

export default Movie;