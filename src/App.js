import React, { Component } from 'react';
// import logo from './assets/images/logo.svg';
import './assets/css/App.css';
// import Reactform from './components/Reactform';


import Home from './components/Home';

// import List from './components/List';
// import Todolist from './components/Todolist';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <h2>Welcome to React</h2> */}
        {/* </div> */}
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Home />
        {/* <List /> */}
        {/* <Todolist /> */}
        {/* <Reactform /> */}
      </div>
    );
  }
}

export default App;
