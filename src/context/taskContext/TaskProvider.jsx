import { useState } from "react";
import TaskContext from "./taskContext";

const TaskProvider = ({children}) => {
    const [task, setTask] = useState([])

    return(
        <TaskContext.Provider value={{task, setTask}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider