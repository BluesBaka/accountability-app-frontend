import React from 'react'


const TaskList = props => {

  const displayTasks = () => {
    return props.tasks.map((task, idx) => {
      return <li key={idx}>{task.title}</li>
    })

  }

    return(
      <div className="">
        <form onSubmit={props.addATask}>
          <input type="text" name="taskInput" />
          <input type="submit" value="Add" />
        </form>
        <ul>
          {displayTasks()}
        </ul>
      </div>
    )

}

export default TaskList
