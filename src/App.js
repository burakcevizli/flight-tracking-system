import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FlightMap from './FlightMap';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FlightMap} />
      </Switch>
    </Router>
  );
};

export default App;
