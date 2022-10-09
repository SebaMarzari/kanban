import React, { useState, useContext } from 'react'
import { Button } from 'antd'
import { v4 as uuid } from 'uuid';
import './Navbar.css'
import ModalInput from '../modalInput/ModalInput'
import TaskContext from '../../context/taskContext/taskContext';
import {TITLE, DESCRIPTION, PRIORITY, STATUS, ID, OPEN, TASKS} from '../../services/Constants'

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputTitle, setInputTitle] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [priority, setPriority] = useState(0)

    const {setTask} = useContext(TaskContext)

    const newTask = () => {
        const id = uuid()
        const newTask = {
            [TITLE]: inputTitle,
            [DESCRIPTION]: inputDescription,
            [PRIORITY]: priority,
            [STATUS]: OPEN,
            [ID]: id
        }
        const oldStorage = JSON.parse(localStorage.getItem(TASKS)) || []
        oldStorage.push(newTask)
        localStorage.setItem(TASKS, JSON.stringify(oldStorage))
        setTask(oldArray => [...oldArray, newTask])
}

    const handleClick = () => {
        setIsModalOpen(true)
    }

    return (
        <div>
            <Button className='navbarContainer' onClick={handleClick}>
                Crear tarea
            </Button>
            <ModalInput
                open={isModalOpen}
                setOpen={setIsModalOpen}
                newTask={newTask}
                inputTitle={inputTitle}
                setInputTitle={setInputTitle}
                inputDescription={inputDescription}
                setInputDescription={setInputDescription}
                priority={priority}
                setPriority={setPriority}
            />
        </div>
    )
}

export default Navbar