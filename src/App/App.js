import React from 'react';
import firebase from 'firebase/app';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import './App.scss';
import Auth from '../components/Auth';
import MyNavbar from '../components/MyNavbar';
import BoardContainer from '../components/BoardContainer';

import Home from '../views/Home';
import Boards from '../views/Boards';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import PinDetails from '../views/PinDetails';
import BoardForm from '../views/BoardForm';
import PinForm from '../views/PinForm';
import NotFound from '../views/NotFounds';

fbConnection();
class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNavbar authed={authed} />
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
      </div>
    );
  }
}

export default App;
