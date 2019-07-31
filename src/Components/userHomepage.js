import React, { Component, Fragment } from 'react'
import TaskList from './taskList'
import CalendarTracker from './calendar'
import Timer from './timer'

// props= appState, addATask(), sendTime(), deleteTask()
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
        <TaskList tasks={this.props.appState.currentTasks} addATask={this.props.addATask}
        deleteTask={this.props.deleteTask}/>

        {/* <CalendarTracker /> */}
      </Fragment >

    )
  }

}

export default UserHomepage
