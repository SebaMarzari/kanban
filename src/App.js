import './App.css';
import Container from './components/container/Container';
import Navbar from './components/navbar/Navbar';
import TaskProvider from './context/taskContext/TaskProvider';

function App() {

    return (
        <TaskProvider >
            <div className='App-header'>
                <Navbar />
                <Container />
            </div>
        </TaskProvider>
    );
}

export default App;
