import React, { Component, Fragment } from 'react'
// import TaskList from './taskList'
// import CalendarTracker from './calendar'
import WorkSession from './workSession'
import Timer from './timer'

class UserHomepage extends Component {

  constructor(){
    super()
    this.state = {
      allSessions: []
    }
  }

  render(){
    return(
      <workSession>
      <Fragment >
    {/*  <TaskList /> */}
        <Timer />
        {/* <CalendarTracker /> */}
      </Fragment >
      </workSession>
    )
  }

}

export default UserHomepage
