import React, { Component, Fragment } from 'react'
import TaskList from './taskList'
import CalendarTracker from './calendar'
import Timer from './timer'

// props= appState, addATask(), sendTime()
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
        <Timer sendTime={this.props.sendTime}/>
        <TaskList tasks={this.props.appState.currentTasks} addATask={this.props.addATask}/>

        {/* <CalendarTracker /> */}
      </Fragment >

    )
  }

}

export default UserHomepage
