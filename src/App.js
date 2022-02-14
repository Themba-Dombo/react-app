import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {fetchTasks, fetchTask} from "./service/queryDB"

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks()
  }, []);

  const updateTask = async (id,task) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    return data;
  }

  //Delete Task function
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
    {method: 'DELETE'})

    setTasks(tasks.filter((task) => task.id !== id))
  }
  
  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks, data])
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const data = await updateTask(id,updatedTask)
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <Router>
      <div className='container'>
        <Header showAddTask={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} />
        <Routes>
          <Route path="/" exact element={
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ?  (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : (<h3>No Tasks</h3>)} 
            </>
          }/> 
        </Routes>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <Routes>
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
