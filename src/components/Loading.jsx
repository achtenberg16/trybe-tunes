import React, { Component } from "react";
import "../styles/loading.css";

class Loading extends Component {
  render() {
    return (
      <div className='loading'>
        <div className='load'></div>
      </div>
    );
  }
}

export default Loading;
