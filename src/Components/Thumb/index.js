import React from 'react';
import { Link } from 'react-router-dom';

const Thumb = function (id, title, release_date, vote_count, popularity) {
  
  return (
    <div className="thumb">
      <Link to={'/movies/'+id}>{title}</Link>
      <p className="date">{release_date}</p>
      <p className="popularity">Popularity: {popularity}</p>
      <p className="votes">{vote_count} votes</p>
    </div>
  );
}

export default Thumb;