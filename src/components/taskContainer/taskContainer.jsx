import React, { useContext, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalInput from '../modalInput/ModalInput';
import './taskContainer.css'
import { Card } from 'antd'
import { handleClick, updateLocalStorage } from '../../services/Services';
import TaskContext from '../../context/taskContext/taskContext';
import { EDIT, DELETE } from '../../services/Constants'

const TaskContainer = ({ children, status, accessKey }) => {
    const { setTask } = useContext(TaskContext)
    const [edit, setEdit] = useState(false)
    const [inputTitle, setInputTitle] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [priority, setPriority] = useState(0)
    const [currentId, setCurrentId] = useState('')

    const updateTask = ({ ...props }) => {
        setEdit(true)
        setCurrentId(props.id)
        setInputTitle(props.title)
        setInputDescription(props.description)
        setPriority(props.priority)
    }

    return (
        <Card
            actions={[
                <EditOutlined aria-label={EDIT} key={accessKey} accessKey={accessKey} />,
                status,
                <DeleteOutlined aria-label={DELETE} key={accessKey} accessKey={accessKey} />,
            ]}
            className='taskStyle'
            onClick={(e) => handleClick(
                e,
                updateTask,
                setTask,
            )}
        >
            {children}
            <ModalInput
                open={edit}
                setOpen={setEdit}
                newTask={() => updateLocalStorage(currentId, inputTitle, inputDescription, priority, setTask)}
                inputTitle={inputTitle}
                setInputTitle={setInputTitle}
                inputDescription={inputDescription}
                setInputDescription={setInputDescription}
                priority={priority}
                setPriority={setPriority}
            />
        </Card>
    )
}

export default TaskContainer