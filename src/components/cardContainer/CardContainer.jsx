import { JsonData } from '../jsondata';
import TaskContainer from '../taskContainer/taskContainer';
import './CardContainer.css'
import { TITLE, DESCRIPTION, PRIORITY } from '../../services/Constants';

const CardContainer = ({ task, status }) => {
    return (
        <TaskContainer
            status={status}
            accessKey={task.id}
            className="cardContainer"
            >
            <h1 name={TITLE}>{task.title}</h1>
            <h2 name={DESCRIPTION}>Descripcion: {task.description}</h2>
            <hr />
            <h3 name={PRIORITY}>Prioridad: {JsonData.map(data => {
                if (data.priority == task.priority) {
                    return data.name
                }
            })}</h3>
        </TaskContainer>

    )
}

export default CardContainer