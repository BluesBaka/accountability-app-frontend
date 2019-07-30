import React, { Component, Fragment } from 'react'
import TaskList from './taskList'
import CalendarTracker from './calendar'
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
      <Fragment >
        <TaskList />
        <Timer />
        <CalendarTracker />
      </Fragment >

    )
  }

}

export default UserHomepage
