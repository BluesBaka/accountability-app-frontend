import React, { Component, Fragment } from 'react'
import TaskList from './taskList'
import CalendarTracker from './calendar'
import Timer from './timer'

// props= appState, addATask(), beginTimer(), deleteTask(), working, toggleCheckbox()
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
        <Timer beginTimer={this.props.beginTimer}/>
        <TaskList tasks={this.props.appState.currentTasks} addATask={this.props.addATask}
        deleteTask={this.props.deleteTask}
        working={this.props.working}
        toggleCheckbox={this.props.toggleCheckbox}
        />

        {/* <CalendarTracker /> */}
      </Fragment >

    )
  }

}

export default UserHomepage
