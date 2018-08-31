import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DynamicFormFactory from "./DynamicFormFactory";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    let club_props = { club: ""};
    let player_props = { player: ""};
    return (
      <div className="App">
        <Link to='/clubregistration'><button>Club Registration</button></Link>
        <Link to='/playerdetails'><button>Player Details</button></Link>

        <Switch>
        <Route path="/clubregistration" render={ (club_props) => <DynamicFormFactory {...club_props} />} />
        <Route path="/playerdetails" render={ (player_props) => <DynamicFormFactory {...player_props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
