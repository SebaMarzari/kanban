import React, { useContext, useEffect, useState } from 'react'
import './Container.css'
import { ArrowRightOutlined, CheckOutlined, PlayCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import CardContainer from '../cardContainer/CardContainer';
import { Card } from 'antd'
import { v4 as uuid } from 'uuid';
import TaskContext from '../../context/taskContext/taskContext';
import { OPEN, IN_PROGRESS, CODE_REVIEW, FINISHED, TASKS, RETURN_TO_OPEN } from '../../services/Constants';


const Container = () => {
    const { task, setTask } = useContext(TaskContext)
    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem(TASKS)) || []
        if (storage) {
            task.push(storage)
            setTask(...task, task)
        }
    }, [])

    //regex camelCase to String with spaces
    const camelCaseToString = (str) => {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
    }

    return (
        <div className='container'>
            {
                <Card title={camelCaseToString(OPEN)} className="cardContainer">
                    {task.map(task => {
                        if (task.status === OPEN) {
                            return (
                                <CardContainer task={task}
                                    status={
                                        <PlayCircleOutlined
                                            aria-label={IN_PROGRESS}
                                            key={uuid()}
                                            accessKey={task.id}
                                        />}
                                />)
                        }
                    })}
                </Card>
            }

            {
                <Card title={camelCaseToString(IN_PROGRESS)} className="cardContainer">
                    {task.map(task => {
                        if (task.status === IN_PROGRESS) {
                            return (
                                <CardContainer
                                    task={task}
                                    status={[<RollbackOutlined aria-label={RETURN_TO_OPEN} key={uuid()} accessKey={task.id} />,
                                    <ArrowRightOutlined aria-label={CODE_REVIEW} key={uuid()} accessKey={task.id} />]}
                                />
                            )
                        }
                    })}
                </Card>
            }

            {
                <Card title={camelCaseToString(CODE_REVIEW)} className="cardContainer">
                    {task.map(task => {
                        if (task.status === CODE_REVIEW) {
                            return (
                                <CardContainer task={task}
                                    status={
                                        <CheckOutlined
                                            aria-label={FINISHED}
                                            key={uuid()}
                                            accessKey={task.id}
                                        />}
                                />)
                        }
                    })}
                </Card>
            }
        </div>
    )
}

export default Container