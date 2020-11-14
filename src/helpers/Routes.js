import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Home from '../views/Home';
import Boards from '../views/Boards';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import PinDetails from '../views/PinDetails';
import BoardForm from '../views/BoardForm';
import PinForm from '../views/PinForm';
import NotFound from '../views/NotFounds';

export default function Routes(authed) {
  return (
  <Router>
          <Switch>
            <Route exact path='/' component={() => <Home authed={authed}/>} />
            <Route exact path='/boards' component={() => <Boards authed={authed}/>} />
            <Route exact path='/pins' component={() => <Pins authed={authed}/>} />
            <Route exact path='/singleboard' component={() => <SingleBoard authed={authed}/>} />
            <Route exact path='/pindetails' component={() => <PinDetails authed={authed}/>} />
            <Route exact path='/boardform' component={() => <BoardForm authed={authed}/>} />
            <Route exact path='/pinform' component={() => <PinForm authed={authed}/>} />
            <Route component={NotFound} />
          </Switch>
        </Router>
  );
}
