import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FlightMap from './FlightMap';
import FlightList from './FlightList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FlightMap} />
        <Route path="/flightList" component={FlightList} />
      </Switch>
    </Router>
  );
};

export default App;
