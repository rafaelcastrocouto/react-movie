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

      var { id, title, release_date, overview, vote_count, poster_path, adult, popularity, production_countries, tagline} = data;

      return (
        <>
          <h1 key={id}>{title}</h1>
          <span className="date">{release_date}</span>
          <p className="tagline">{tagline}</p>
          <div className="details">
            <img src={'https://image.tmdb.org/t/p/original'+poster_path} alt="Movie Poster"/>
            <p className="overview">Overview: {overview}</p>
            <p className="country">From: {production_countries[0] ? production_countries[0].name : ''}</p>
            <p className="popularity">Popularity: {popularity}</p>
            <p className="votes">{vote_count} votes</p>
            <p className="nsfw">{adult ? 'NSFW' : ''}</p>
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