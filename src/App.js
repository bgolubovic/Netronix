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
    
    // connect to the realtime database stream
    let API =  'https://jsdemo.envdev.io/sse';
    let eventSource = new EventSource(API);

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