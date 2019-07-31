import React from 'react'

// props= tasks, addATask(), deleteTask(), working
const TaskList = props => {

  const displayTasks = () => {
      return props.tasks.map((task, idx) => {
        return props.working ?
         createCheckedTasks(task, idx) : createEditTasks(task, idx)
    })
  }

  const createEditTasks = (task, idx) => {
    return <li key={idx}>
    <input type="checkbox" name={task.title} disabled />
    {task.title}
    <button className="delete-button" name="delete-button" onClick={()=> props.deleteTask(task)}>X</button>
    <button className="edit-button" name="edit-button">E</button>
    </li>
  }

  const createCheckedTasks = (task, idx) => {
    return <li key={idx}>
    <input type="checkbox" name={task} />
    {task.title}

    </li>
  }

    return(
      <div className="">
        <form onSubmit={props.addATask}>
          <input type="text" name="taskInput" />
          <input type="submit" value="Add" />
        </form>
        <ul className="task-list">
          {displayTasks()}
        </ul>
      </div>
    )

}

export default TaskList
