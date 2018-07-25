import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetch } from "./actions";

import './App.css';

let mapStateToProps = store => {
  return store
};

class App extends Component {

  loadData() {
    this.props.dispatch(fetch());
  }

  render() {
    const store = this.props.measurements;
    return (
      <div className="App">
        <button onClick={this.loadData.bind(this)}>
          Load random color from API
        </button>
        <p>{store}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);