import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeData } from "./actions";

import './App.css';

let mapStateToProps = store => {
  return store
};

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {ping: new Date(), evt: '', tickers: []};
    
    // connect to the realtime database stream
    let API =  'https://jsdemo.envdev.io/sse';
    let eventSource = new EventSource(API);

    // check if the realtime connection is dead, reload client if dead
    setInterval(() => {
      let now = new Date().getTime();
      let diff = (now - this.state.ping.getTime()) / 1000;
      
      // haven't heard from the server in 20 secs?
      if (diff > 20) {
        // hard reload of client
        window.location.reload();
      }
    }, 10000);
    
    // listen on ping from server, keep time
    eventSource.addEventListener('ping', function(e) {
        this.setState(previousState => {
          return {ping: new Date(e.data)};
        });
    }.bind(this), false);
    
    // listen for database REST operations
    eventSource.addEventListener('put', (e) => {
        this.getTickerData()
        
    }, false);
    
    eventSource.addEventListener('delete', (e) => {
        this.getTickerData()
        
    }, false);

    eventSource.addEventListener('post', (e) => {
        this.getTickerData();
        
    }, false);

    eventSource.addEventListener("error", (e) => {
      // typically lost network connection
      console.log("Error", e);
    });

    eventSource.onmessage = (e) => {
      this.props.dispatch(changeData(e.data));
    }
  }

  render() {
    const store = this.props.measurements;
    return (
      <div className="App">
        <p>{store}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);