import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo Application</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/new" element={<TaskForm />} />
          <Route path="/task/:id" element={<TaskForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;