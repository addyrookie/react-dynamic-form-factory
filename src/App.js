import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DynamicFormFactory from "./DynamicFormFactory";
import { Link, Route, Switch } from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      config: [],
      current: {},
      url: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendConfig = this.sendConfig.bind(this);
  }


  onSubmit = (config) => {
    let data = [];
    if (config.id) {
      data = this.state.data.filter((d) => {
        return d.id != config.id
      });
    } else {
      config.id = +new Date();
      data = this.state.data.slice();
    }
    
    this.setState({
      data: [config, ...data]
    });
  }

  handleChange = (e) => {
    this.setState({ url : e.target.value})
  }

  sendConfig() {
    fetch(this.state.url)
      .then(response => response.json())
      .then( config => this.setState({ config: config } ))
  }

  componentDidMount() {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(all => this.setState({ data: all } ))

   fetch('http://localhost:5000/usermodel')
      .then(response => response.json())
      .then( config => this.setState({ config: config } ))
  }


  render() {
    let club_props = { club: ""};
    let player_props = { player: ""};
    return (
      <div className="App">
        <Link to='/clubregistration'><button>Club Registration</button></Link>
        <Link to='/playerdetails'><button>Player Details</button></Link>
        <input type="text" value={this.state.url} placeholder="Please enter the url for config file" onChange={this.handleChange} />
        <button onClick={this.sendConfig}>Send Config </button>


        <Switch>
        <Route path="/clubregistration" render={ (club_props) => 
                                              <DynamicFormFactory 
                                                  {...club_props} 
                                                  config={this.state.config }
                                                  defaultValues = {this.state.current}
                                                  onSubmit={(config) => this.onSubmit(config)}
                                                  title="Club Registration"/>} />
        <Route path="/playerdetails" render={ (player_props) =>
                                              <DynamicFormFactory 
                                                  {...player_props}
                                                  config={this.state.config }
                                                  onSubmit={(config) => this.onSubmit(config)}
                                                  title="Player Details" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
