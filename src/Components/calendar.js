import React, { Component } from 'react'
import Calendar from 'react-calendar'

class CalendarTracker extends Component {

  // constructor(){
  //   super()
  //   this.state = {
  //     allSessions: []
  //   }
  // }

  render(){
    return(
      <div className="calendar">
        <Calendar />
      </div>
    )
  }

}

export default CalendarTracker
