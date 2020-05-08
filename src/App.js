import React from 'react';
import './App.css';
import Router from './Pages';
import SearchBar from './Components/SearchBar';
import { BrowserRouter, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="Header">
          <h1><Link to="/">Movie app</Link></h1>
          <SearchBar />
        </div>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
