import React from 'react';
import './index.css';

class Movie extends React.Component {

  state = {
    loading: true,
    data: []
  }
  
  async componentDidMount() {
    var path = window.location.pathname.split('/');

    var id = path[path.length-1];
    
    if (!id) id = '1';

    const key = process.env.REACT_APP_API_KEY;

    const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+key+'&language=en-US';

    const res = await fetch(url);
    const data = await res.json();

    this.setState({
      loading: false, 
      data: data
    });

    //console.log('Movie:', data);
  }

  MovieDesc () {
    var { id, title, release_date, overview, vote_count, poster_path, adult, popularity, production_countries, tagline} = this.state.data;
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

  render() {
    return (
      <div className="movie">
        { this.state.loading ? 'Loading' : this.MovieDesc() }
      </div>
    )
  }
}

export default Movie;