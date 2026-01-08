import { useState, useEffect } from 'react';
import { getAllTasks } from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoginView, setIsLoginView] = useState(true);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await getAllTasks();
      if (response.success && response.data) {
        setTasks(response.data);
        setError(null);
      } else {
        setError('Failed to load tasks. Invalid response from server.');
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load tasks. Make sure the backend server is running.';
      setError(errorMessage);
      // If unauthorized, logout user
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleTaskCreated = () => {
    fetchTasks();
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    };
  };

  const stats = getTaskStats();

  if (authLoading) {
    return <div className="loading">Checking authentication...</div>;
  }

  if (!user) {
    return (
      <div className="auth-container">
        <header className="app-header">
          <h1>✅ Task Tracker</h1>
          <p>Manage your tasks efficiently</p>
        </header>
        {isLoginView ? (
          <Login onToggle={() => setIsLoginView(false)} />
        ) : (
          <Register onToggle={() => setIsLoginView(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content glass">
          <div>
            <h1>Task Tracker</h1>
            <p>Welcome back, {user.name}!</p>
          </div>
          <button className="btn-logout" onClick={logout}>
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="container glass">
        {error && (
          <div className="error-banner">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card glass">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-card pending glass">
            <div className="stat-label">Pending</div>
            <div className="stat-value">{stats.pending}</div>
          </div>
          <div className="stat-card in-progress glass">
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{stats.inProgress}</div>
          </div>
          <div className="stat-card completed glass">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{stats.completed}</div>
          </div>
        </div>

        <TaskForm onTaskCreated={handleTaskCreated} />

        <div className="filter-tabs glass">
          <button
            className={filterStatus === 'all' ? 'active' : ''}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button
            className={filterStatus === 'pending' ? 'active' : ''}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </button>
          <button
            className={filterStatus === 'in-progress' ? 'active' : ''}
            onClick={() => setFilterStatus('in-progress')}
          >
            In Progress
          </button>
          <button
            className={filterStatus === 'completed' ? 'active' : ''}
            onClick={() => setFilterStatus('completed')}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading your tasks...</span>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
            filterStatus={filterStatus}
          />
        )}
      </div>
    </div>
  );
}

export default App;
