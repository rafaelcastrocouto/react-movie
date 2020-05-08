import React from 'react';
import './App.css';
import Router from './Pages';
import SearchBar from './Components/SearchBar';

function App() {
  return ( 
    <div className="App">
      <div className="Header">
        <h1><a href="/">Movie app</a></h1>
        <SearchBar />
      </div>
      <Router />
    </div>
  );
}

export default App;
