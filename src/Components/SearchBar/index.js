import React from 'react';
import './index.css';

const SearchBar = function () {
  return (
    <form className="searchBar" action="/search/1">
      <input name="query" type="text" placeholder="Search"/>
      <input type="submit" value="🔎"/>
    </form>
  );
}

export default SearchBar;