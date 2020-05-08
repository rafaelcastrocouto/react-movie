import React from 'react';
import './index.css';
import { useLocation, useHistory } from "react-router-dom";

const SearchBar = function () {
   
  const history = useHistory();

  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const urlquery = params.get('query');

  function handleChange(event) {
    var query = new URLSearchParams(event.target.value).toString().slice(0, -1);
    var path = loc.pathname.split('/');
    var page = path[path.length-1] || 1;
    history.push('/search/'+page+'?query='+query);
  }

  function handleSubmit(event) {
    event.preventDefault();
  } 

  return (
    <form className="searchBar" action="/search/1" onSubmit={handleSubmit}>
      <input name="query" type="text" placeholder="Search" onChange={handleChange} value={urlquery ? urlquery : ''}/>
      <input type="submit" value="🔎"/>
    </form>
  );
}

export default SearchBar;