import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PointCreation from '../pages/PointCreation';

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cadastro" component={PointCreation} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
