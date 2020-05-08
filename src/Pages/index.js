import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import Search from './Search';

export default () => {
  return (
    <Switch>
      <Route path="/page/:page">
        <Home />
      </Route>
      <Route path="/movies/:id">
        <Movie />
      </Route>
      <Route path="/search/:page">
        <Search />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};