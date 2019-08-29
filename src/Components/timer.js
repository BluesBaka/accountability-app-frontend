// turn off milliseconds view
// option to pause?
// replace timer text on stop with total timeout


import React, { Component } from 'react'
import ReactCountdownClock from "react-countdown-clock";

// props= sendTime(), completeTimer()
class Timer extends Component {

  constructor(){
    super()
    this.state = {
      // allSessions: []
      pausation: true,
      class: "stop-button",
      firstClick: false,
      isAStopButton: false
    }
  }

  startTime = () => {
    console.log("TimeStamp")
    this.setState({
      pausation: false,
      isAStopButton: true
    })
    this.props.beginTimer()

    // create checkboxes
    // create notebox
  };

  wrapUpSession = () => {
    this.setState({
      pausation: true,
      class: "stop-button hidden"
    })
    this.props.completeTimer()
    // call a function to "complete" workSession
      // send endtime TimeStamp
      // create finish worksession button (submit)
  };

  // toggle = (pausation) => {
  //    this.setState({
  //      pausation: !this.state.pausation
  //    })
  // };

  render() {
    const minutes = 20;



    return (
      <div className="timer">
        <ReactCountdownClock
          seconds={60 * minutes}
          color="#09792e"
          alpha={0.5}
          size={150}
          onComplete={()=> this.wrapUpSession()}
          paused ={this.state.pausation}
          weight={20}

        />

        <div className="timer-btn">
          {!this.state.isAStopButton ? (
            <button className="start-button" onClick={() =>
              this.startTime()} >Start</button>) :

            (<button onClick={()=> this.wrapUpSession()}   className={this.state.class}>STOP</button>)
            }

        </div>


      </div>
    );
  }
}

export default Timer;
