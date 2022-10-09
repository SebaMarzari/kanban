import {
    IN_PROGRESS,
    EDIT,
    CODE_REVIEW,
    RETURN_TO_OPEN,
    DELETE,
    FINISHED,
    OPEN,
    TASKS,
    TITLE,
    DESCRIPTION,
    PRIORITY,
    STATUS,
    ID
} from "./Constants"
export const handleClick = (
    e,
    updateTask,
    setTask = () => { },
) => {
    const data = localStorage.getItem(TASKS)
    const dataParsed = JSON.parse(data)
    switch (e.target.ariaLabel) {
        case IN_PROGRESS:
            updateTaskStatus(IN_PROGRESS, e.target.accessKey, setTask)
            break
        case EDIT:
            const task = dataParsed.filter(task => task.id === e.target.accessKey)
            updateTask({ id: e.target.accessKey, title: task[0].title, description: task[0].description, priority: task[0].priority })
            break
        case CODE_REVIEW:
            updateTaskStatus(CODE_REVIEW, e.target.accessKey, setTask)
            break
        case RETURN_TO_OPEN:
            updateTaskStatus(OPEN, e.target.accessKey, setTask)
            break
        case DELETE:
        case FINISHED:
            const newData = dataParsed.filter(task => task.id !== e.target.accessKey)
            localStorage.setItem(TASKS, JSON.stringify(newData))
            setTask(newData)
            break
    }
}

//function for update task
export const updateTaskStatus = (updateStatus, id, setTask = () => { }) => {
    const data = localStorage.getItem(TASKS)
    const dataParsed = JSON.parse(data)
    const task = dataParsed.filter(task => task.id === id)
    const index = dataParsed.indexOf(task[0])
    dataParsed[index].status = updateStatus
    localStorage.setItem(TASKS, JSON.stringify(dataParsed))
    setTask(dataParsed)
}

// function for update localstorage
export const updateLocalStorage = (
    currentId,
    inputTitle,
    inputDescription,
    priority,
    setTask = () => { }
) => {
    const data = localStorage.getItem(TASKS)
    if (data) {
        const oldTasks = JSON.parse(data)
        const updateTasks = oldTasks.map(task => {
            if (task.id === currentId) {
                return {
                    [TITLE]: inputTitle,
                    [DESCRIPTION]: inputDescription,
                    [PRIORITY]: priority,
                    [STATUS]: task.status,
                    [ID]: currentId
                }
            } else {
                return task
            }
        })
        localStorage.setItem(TASKS, JSON.stringify(updateTasks))
        setTask(updateTasks)
    }
}