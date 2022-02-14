import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTask } from "../service/queryDB"
import Button from "./Button";

function TaskDetails() {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});

  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const getTask = async () => {
    const task = await fetchTask(params.id);
    setTask(task);
    setLoading(false);
    };
    getTask();
  }, [])

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
        <h3>{task.text}</h3>
        <p>{task.day}</p>
        <Button onClick={() => {
            navigate(-1)
        }}
        text='Go Back'/>
    </div>
  )
}

export default TaskDetails