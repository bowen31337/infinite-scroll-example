import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.css";
import SearchBar from "./components/SearchBar";
import Movie from "./components/Movie";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/movie/:movieId">
            <Movie />
          </Route>
          <Route path="/">
            <SearchBar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
