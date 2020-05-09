import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Thumb = function (data) {
  
  var {id, title, release_date, vote_count, popularity, poster_path} = data;

  return (
    <Link key={id} to={'/movies/'+id} className="thumb">
      <li>
        <div>
          { poster_path ? <img className="poster" src={'https://image.tmdb.org/t/p/original'+poster_path} alt="Movie Poster"/> : ''}
          <h3>{title}</h3>
          <p className="date">{release_date}</p>
          <p className="popularity">Popularity: {popularity}</p>
          <p className="votes">{vote_count} votes</p>
        </div>
      </li>
    </Link>
  );
}

export default Thumb;