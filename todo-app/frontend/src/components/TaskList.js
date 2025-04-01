import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EmailForm from './EmailForm';
import EmailInbox from './EmailInbox';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailTask, setEmailTask] = useState(null);
  const [showInbox, setShowInbox] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  const handleEmailClick = (task) => {
    setEmailTask(task);
    setShowInbox(false);
  };

  const handleCloseEmailForm = () => {
    setEmailTask(null);
  };

  const handleCheckInbox = () => {
    setShowInbox(true);
    setEmailTask(null);
  };

  const handleCloseInbox = () => {
    setShowInbox(false);
  };

  const handleOpenInbox = () => {
    setShowInbox(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <div className="button-group">
          <button
            onClick={handleCheckInbox}
            className="btn btn-secondary me-2"
          >
            Check Email Inbox
          </button>
          <Link to="/task/new" className="btn btn-primary">Add New Task</Link>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found. Create a new one!</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span className={`status status-${task.status}`}>{task.status}</span>
              </div>
              <div className="task-actions">
                <Link to={`/task/${task.id}`} className="btn btn-primary">Edit</Link>
                <button 
                  onClick={() => handleEmailClick(task)} 
                  className="btn btn-info"
                >
                  Email
                </button>
                <button 
                  onClick={() => handleDelete(task.id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {emailTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EmailForm 
              taskId={emailTask.id} 
              taskTitle={emailTask.title}
              onClose={handleCloseEmailForm} 
            />
          </div>
        </div>
      )}

      {showInbox && (
        <div className="modal-overlay">
          <div className="modal-content modal-lg">
            <EmailInbox onClose={handleCloseInbox} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;