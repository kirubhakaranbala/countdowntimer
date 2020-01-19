import React, { Component } from 'react';
import './App.css';
import Countdown from './components/countdown';
class App extends Component {
  
  render() { 
    return ( 
      <div className="App" onKeyUp={this.keyPressed}>
        <div className="App-title">Countdown Timer</div>
        <div className="Timers">
           
          <Countdown />
        </div>
      </div>
     );
  }
}
 
export default App;
