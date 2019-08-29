import React, { Component, Fragment } from 'react'
import TaskList from './taskList'
import CalendarTracker from './calendar'
import Timer from './timer'
import Note from './workSessionComponents/note'

// props= appState, addATask(), beginTimer(), deleteTask(), working, toggleCheckbox(), completeTimer(), submitable, submitWorkSession()
class UserHomepage extends Component {

  constructor(){
    super()
    this.state = {
      allSessions: []
    }
  }

  renderNote = () => {
    return this.props.working ? <Note submitable={this.props.submitable} submitWS={this.props.submitWorkSession}/> : null
  }
  render(){


    return(
      <Fragment >
        <Timer beginTimer={this.props.beginTimer} completeTimer={this.props.completeTimer}/>
        <TaskList tasks={this.props.appState.currentTasks} addATask={this.props.addATask}
        deleteTask={this.props.deleteTask}
        working={this.props.working}
        toggleCheckbox={this.props.toggleCheckbox}
        />
        {this.renderNote()}
        {/* <CalendarTracker /> */}
      </Fragment >

    )
  }

}

export default UserHomepage
