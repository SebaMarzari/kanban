import { Input, Modal, Select } from 'antd'
import { JsonData } from '../jsondata';

const { TextArea } = Input
const { Option } = Select

const ModalInput = ({
    open,
    setOpen,
    newTask,
    inputTitle,
    setInputTitle,
    inputDescription,
    setInputDescription,
    priority,
    setPriority }) => {

    const handleCancel = () => {
        setInputTitle('')
        setInputDescription('')
        setOpen(false)
    }

    const handleChangeTitle = (value) => {
        setInputTitle(value)
    }

    const handleChangeDescription = (value) => {
        setInputDescription(value)
    }

    const handleOk = () => {
        newTask()
        setInputTitle('')
        setInputDescription('')
        setOpen(false)
    }

    const handleSelect = (e) => {
        setPriority(e.key)
    }
    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
            className='modalContainer'>
            <Input
                placeholder='Titulo'
                value={inputTitle}
                onChange={e => handleChangeTitle(e.target.value)}
                className='inputContainer' />
            <TextArea
                placeholder='Descripcion'
                value={inputDescription}
                onChange={e => handleChangeDescription(e.target.value)}
                className='textAreaContainer' />
            <Select
                style={{
                    width: '100%',
                }}
                defaultValue={priority ? (JsonData.filter(name => name.priority == priority))[0].name : 'Seleccione una prioridad'}
                onSelect={(value, e) => handleSelect(e)}
            >
                {JsonData.map(value => {
                    return <Option key={value.priority} value={value.name}> {value.name} </Option>
                })}
            </Select>
        </Modal>
    )
}

export default ModalInput