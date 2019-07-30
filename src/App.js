import React, {Component} from 'react';
import './App.css';
import UserHomepage from './Components/userHomepage'
import Timer from './Components/timer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        name: "",
        id: 1
      },
      tasks: [],
      workSessions: [],
      currentSession: [],
      currentTasks: []
    }
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
        ...this.state,
        workSessions: sessions
      }, ()=> {getCurrentSession()})
    }

    const getCurrentSession = () => {
      if (this.state.currentSession.length === 0) {

        const lastSession = this.state.workSessions[this.state.workSessions.length - 1]

        // console.log(this.state.workSessions)

        if (lastSession.start_time === ""){

          const sessions = this.state.workSessions.filter(session => session !== lastSession)

          this.setState({
            ...this.state,
            currentSession: lastSession,
            workSessions: sessions
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
  };

  componentDidUpdate(){

    const getOpenTasks = () => {
      fetch("http://localhost:3001/tasks")
      .then(res => res.json())
      .then(data => filterOpenTasks(data))
    }

    const filterOpenTasks = tasks => {
      const openTasks = tasks.filter(task => {
        return task.status === "open"

        reassignWS(openTasks)
      })
    }

    const reassignWS = openTasks => {
      openTasks.map(task => {
        fetch(`http://localhost:3001/tasks/${task.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            work_session_id: this.state.currentSession.id
          })
        })
      })
    }

    // const getCurrentTasks = task => {
    //   this.setState({
    //     ...this.state,
    //     currentTasks: [
    //       ...this.state.currentTasks,
    //       task
    //     ]
    //   })
    // }

    getOpenTasks();
  };

  render(){
    return (
      <div className="App">
        <UserHomepage />
         {/* <Timer /> */}
      </div>
    );
  }
}


export default App;
