import React from 'react';
import Thumb from './../Thumb';
import Pagination from './../Pagination';

class Search extends React.Component {

  state = {
    name: 'search',
    page: 1,
    loading: true,
    data: []
  }
  
  async componentDidMount() {
    const path = window.location.pathname.split('/');

    const page = path[path.length-1] ? path[path.length-1] : this.state.page;

    const search = window.location.search;
    
    let query = search.substr(1);

    const key = process.env.REACT_APP_API_KEY;

    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+key+'&'+query+'&page='+page;

    const res = await fetch(url);
    const data = await res.json();

    this.setState({
      loading: false,
      query: query,
      data: data
    });

    //console.log('Search:', data);
  }

  SearchResults () {
    return this.state.data.results.map(({ id, title, release_date, vote_count, popularity, backdrop_path }) => (
      <li key={id} style={{backgroundImage: 'url(https://image.tmdb.org/t/p/original'+backdrop_path+')'}}>
        {Thumb(id, title, release_date, vote_count, popularity)}
      </li>
    ))
  }

  render() {
    if (this.state.loading) return 'Loading';
    else return (
      <>
        {Pagination(this.state)}
        <ul className='searchResults'>{this.SearchResults()}</ul>
        {Pagination(this.state)}
      </>
    )
  }
}

export default Search;