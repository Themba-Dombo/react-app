import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react"


function App() {
  const [tasks, setTasks] = useState(
    [
        {
            id:1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true
        },
        {
            id:1,
            text: 'Meeting at School',
            day: 'Feb 6th at 2:30pm',
            reminder: true
        },
        {
            id:1,
            text: 'Food Shopping',
            day: 'Feb 5th at 2:30pm',
            reminder: false
        }
    ]
  )
  const name = 'Brad'
  return (
    <div className='container'>
      <Header title='Task Tracker'/>
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
