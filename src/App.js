// Move states to userHomepage component
// account for multiple users
  // - create a landing page
  // - create a history page
    // --incorporate with calendar view
  // create a login
  // create a signup
  // JWT auth


import React, {Component} from 'react';

import './App.css';
import UserHomepage from './Components/userHomepage'
// import Timer from './Components/timer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        name: "",
        id: 1
      },
      allTasks: [],
      workSessions: [],
      currentSession: [],
      currentTasks: [],
      working: false,
      closedTasks: [],
      submitable: false,
      startTime: "",
      endTime: ""
    }
  }

  submitWorkSession = (e) => {
    e.persist()
    console.log("submitted")

    this.updateWorkSession(e)
    this.closeCompletedTasks()
  }

  closeCompletedTasks = () => {
    this.state.closedTasks.map(task => {
      fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          status: "closed"
        })
      }).then(resp => resp.json()).then(json => console.log(json))
    })
  }

  updateWorkSession = (e) => {
    const ws_id = this.state.currentSession.id;
    const noteText = e.target.form[0].value;
    const finishedTasks = this.state.closeTasks;
    const startTime = this.state.startTime;
    const endTime = this.state.endTime;
    // debugger;


    fetch(`http://localhost:3001/work_sessions/${ws_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        start_time: startTime,
        end_time: endTime,
        note: noteText
      })
    })
  }
  // onclick on checkboxes
    // will toggle putting into/out of closeTasks state
  toggleCheckbox = (e, task) => {
    // debugger;
    e.target.checked ? this.checkClosed(task) : this.uncheckUnclosed(task);

  }

  checkClosed = task => {
    console.log("check closed", task)
    this.setState({
      closedTasks: [
        ...this.state.closedTasks,
        task
        ]
      })
  }

  uncheckUnclosed = task => {
    console.log("uncheck open", task)
    let updatedClosedTasks = this.state.closedTasks.filter(iTask =>{
      return iTask !== task });

     this.setState({
       closedTasks: updatedClosedTasks
     })
  }

  completeTimer = () => {
    this.saveEndTime()
    // show submit button in note
    this.setState({
      submitable: true
    })
  }

  saveEndTime = () => {
    const date = this.createTime();
    // ;
    this.setState({
      endTime: date
    })
  }
// "WRAP UP" workSession ON STOP OR COMPLETION
  // send endtime TimeStamp
  // create finish worksession button (submit)

  // closeSession ONSUBMIT
    //

  deleteTask = task => {
    fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    const updatedTasks = this.state.currentTasks.filter(oneTask => {
      return oneTask !== task
    })
    console.log("delete button", task)
    this.setState({
      currentTasks: updatedTasks
    })
  }

  // editTask function
  beginTimer = () => {
    this.saveStartTime()
    this.setState({
      working: true
    })
  }


  saveStartTime = () => {
    const date = this.createTime();
    // ;
    this.setState({
      startTime: date
    })
    console.log("saved time")
  }

  createTime = () => {
    let currentDate = new Date();
    let date = currentDate.toString();
    date = date.split(" (")[0];
    return date;
  }
  addATask = (e) => {
    // ;
    e.preventDefault()
    e.persist()
    const input = e.target[0].value;
    console.log(e.target[0].value)

    if (input.length > 0) {
      fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          status: "open",
          title: input,
          work_session_id: this.state.currentSession.id
        })
      })
      .then(resp => resp.json())
      .then(newTask => stateNewTask(newTask) )

      e.target[0].value = ""

      const stateNewTask = newTask => {
         this.setState({
           currentTasks: [
             newTask,
             ...this.state.currentTasks
           ]
         })
      }
    } else{
        console.log("error")
    }

  }



  render(){
    return (
      <div className="App">
        <UserHomepage
        appState={this.state} beginTimer={this.beginTimer} addATask={this.addATask}
        deleteTask={this.deleteTask}
        working={this.state.working}
        toggleCheckbox={this.toggleCheckbox}
        completeTimer={this.completeTimer}
        submitable={this.state.submitable}
        submitWorkSession={this.submitWorkSession}
        />

      </div>
    );
  }

  componentDidMount(){

    fetch("http://localhost:3001/work_sessions")
    .then(res => res.json())
    .then(data => filterWorkSessions(data))

    const filterWorkSessions = (data) => {
      let sessions = data.filter( item => {
        return item.user_id === this.state.user.id
      })

      this.setState({
        workSessions: sessions
      }, ()=> {getCurrentSession()})
    }

    const getCurrentSession = () => {
      if (this.state.currentSession.length === 0) {

        const lastSession = this.state.workSessions[this.state.workSessions.length - 1]

        // console.log(this.state.workSessions)

        if (lastSession.start_time === ""){

          const historicalSessions = this.state.workSessions.filter(hSession => hSession !== lastSession)

          this.setState({
            ...this.state,
            currentSession: lastSession,
            workSessions: historicalSessions
          }, )

        } else {
          fetch("http://localhost:3001/work_sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              start_time: "",
              end_time: "",
              total_time: 20,
              note: "",
              user_id: this.state.user.id
            })
          })
          .then(resp => resp.json())
          .then(wsData => {
            this.setState({
              ...this.state,
              currentSession: wsData
            }, )
          })
        }
      }
    }

    fetch("http://localhost:3001/tasks/")
    .then(resp => resp.json())
    .then(tasks => {
      filterCurrentTasks(tasks);
      // getAllTasks(tasks);
    })

    const filterCurrentTasks = tasks => {

      const currentTasks = tasks.filter(task => {
        return task.work_session_id === this.state.currentSession.id
      })
      // console.log(currentTasks)
      this.setState({
        ...this.state,
        currentTasks: currentTasks
      })
    }

    // const getAllTasks = tasks => {
    //   this.setState({
    //     ...this.state,
    //     allTasks: tasks
    //   })
    // }
  };

  componentDidUpdate(){
    console.log("I updated")
    const getOpenTasks = () => {
      fetch("http://localhost:3001/tasks")
      .then(res => res.json())
      .then(data => filterOpenTasks(data))
      // filter tasks by user
    }

    const filterOpenTasks = tasks => {
      const openTasks = tasks.filter(task => {
        return task.status === "open"
      })
      reassignWS(openTasks)
    }

    const reassignWS = openTasks => {
      openTasks.map(task => {
        // console.log(`%cWork Session ${this.state.currentSession.id} updated`, "color:green;")
        fetch(`http://localhost:3001/tasks/${task.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            work_session_id: this.state.currentSession.id
          })
        }).then(resp => resp.json()).then(json => console.log(json))
      })
    }

    getOpenTasks();
  };
}
export default App;
