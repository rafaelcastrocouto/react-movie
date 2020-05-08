import React from 'react';

const SearchBar = function () {
  return (
    <form className="search" action="/search/1">
      <input name="query" type="text" placeholder="Search"/>
      <input type="submit" value="🔎"/>
    </form>
  );
}

export default SearchBar;