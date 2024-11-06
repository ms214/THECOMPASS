import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectList from './pages/projectList';
import ProjectDetail from './pages/projectDetail';
import TaskItem from './pages/taskItem';
import TaskFrom from './pages/taskForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectList />}/>
        <Route path="/:pid" element={<ProjectDetail />} />
        <Route path="/:pid/:tid" element={<TaskFrom />} />
        <Route path="/:pid/task" element={<TaskItem />} />
        <Route path="/:pid/task/add" element={<TaskFrom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
