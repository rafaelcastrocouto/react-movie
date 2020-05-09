import React, { useState, useEffect } from 'react';
import './index.css';
import Loading from './../Loading';
import { useLocation } from "react-router-dom";

function Movie () {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const pathname = useLocation().pathname;

  const path = pathname.split('/');

  const id = path[path.length-1];
  
  useEffect(()=> {
    async function fetchMovie () {

      const key = process.env.REACT_APP_API_KEY;

      const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+key+'&language=en-US';

      const res = await fetch(url);
      const newdata = await res.json();

      

      if (newdata.backdrop_path) {
        document.documentElement.style.setProperty('--bkg', 'url(https://image.tmdb.org/t/p/original'+newdata.backdrop_path+')');
      }
      
      setLoading(false);
      setData(newdata);

      //console.log('Movie:', newdata);
    }

    fetchMovie();

    return () => {
      document.documentElement.style.setProperty('--bkg', 'linear-gradient(to bottom, #131417, #131417)');
    }

  }, [id]);

  function movieDesc () {
    if(data.id) {
      return (
        <>
          <h1 key={data.id}>{data.title}</h1>
          <span className="date">{data.release_date}</span>
          { data.tagline ? <p className="tagline">{data.tagline}</p> : ''}
          <div className="details">
            { data.poster_path ? <img src={'https://image.tmdb.org/t/p/original'+data.poster_path} alt="Movie Poster"/> : '' }
            <p className="status">Status: {data.status}</p>
            { data.genres.length ? <p className="status">Genres: {data.genres.map((genre) => { return genre.name }).join(', ')}</p> : '' }
            <p className="overview">Overview: {data.overview}</p>
            { data.production_countries.length ? <p className="country">From: {data.production_countries.map((country) => { return country.name }).join(', ')}</p> : '' }
            { data.revenue ? <p className="revenue">Revenue: {new Intl.NumberFormat('EN', { style: 'currency', currency: 'USD' }).format(Number(data.revenue))}</p> : '' }
            <p className="popularity">Popularity: {data.popularity}</p>
            { data.vote_count ? <p className="votes">{data.vote_count} votes {data.vote_average} average</p> : '' }
            { data.adult ? <p className="nsfw">NSFW</p> : ''}
            { data.production_companies.length ? <p className="companies">Companies: {data.production_companies.map((company) => { return company.name }).join(', ')}</p> : '' }
          </div>
        </>
      )
    } else {
       return 'No movie with ID "' + id + '"';
    }
  }

  return (
    <div className="movie">
      { loading ? Loading() : movieDesc() }
    </div>
  );
  
}

export default Movie;