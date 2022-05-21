import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [requiredMessage, setRequiredMessage] = useState(false);
  const [increment, setIncrement] = useState(1);

  function handleCreateNewTask() {
    if(newTaskTitle){
      setRequiredMessage(false)
      setTasks(prevState => [...tasks, {
        id: increment ,
        title: newTaskTitle,
        isComplete: false,
      }])
      setIncrement(increment + 1)
      setNewTaskTitle('')
    }else{
      setRequiredMessage(true)
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const updateTasks = [...tasks]
    const objIndex = updateTasks.findIndex((obj => obj.id == id));
    updateTasks[objIndex].isComplete = (updateTasks[objIndex].isComplete) ? false: true
    setTasks(updateTasks)
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    const updateTasks = [...tasks]
    const objIndex = updateTasks.findIndex((obj => obj.id == id))
    updateTasks.splice(objIndex, 1)
    setTasks(updateTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Your Quests</h2>

        <div className="input-group">
          <div>
            <input 
              type="text" 
              placeholder="New Quest *" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </div>

          {requiredMessage && (
          <div className='alert'>
            <p>This field is required</p>
          </div>
          )}

        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}