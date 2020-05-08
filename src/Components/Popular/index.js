import React from 'react';
import Thumb from './../Thumb';
import Pagination from './../Pagination';

class Popular extends React.Component {

  state = {
    name: 'page',
    page: 1,
    loading: true,
    data: []
  }
  
  async componentDidMount() {
    const path = window.location.pathname.split('/');

    const page = path[path.length-1] ? path[path.length-1] : this.state.page;

    const key = process.env.REACT_APP_API_KEY;

    const url = 'https://api.themoviedb.org/3/movie/popular?api_key='+key+'&language=en-US&page='+page;

    const res = await fetch(url);
    const data = await res.json();

    console.log('Popular', data)

    this.setState({
      loading: false, 
      data: data,
      page: page
    });
  }


  popularItem() {
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
        <h2>Popular</h2>  
        {Pagination(this.state)}
        <ul className='popular'>{this.popularItem()}</ul>
        {Pagination(this.state)}
      </>
    )
  }
}

export default Popular;