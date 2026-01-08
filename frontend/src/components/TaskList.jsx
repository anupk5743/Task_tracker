import { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted, filterStatus }) => {
    const [sortBy, setSortBy] = useState('createdAt');

    const filteredTasks = tasks.filter((task) => {
        if (filterStatus === 'all') return true;
        return task.status === filterStatus;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        switch (sortBy) {
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case 'dueDate':
                return new Date(a.dueDate || '9999') - new Date(b.dueDate || '9999');
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    return (
        <div className="task-list-container">
            <div className="list-header">
                <h2>
                    Tasks ({filteredTasks.length})
                </h2>
                <div className="sort-controls">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="createdAt">Newest First</option>
                        <option value="priority">Priority</option>
                        <option value="dueDate">Due Date</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>

            {sortedTasks.length === 0 ? (
                <div className="no-tasks">
                    <p>No tasks found. Create one to get started! 🚀</p>
                </div>
            ) : (
                <div className="tasks-grid">
                    {sortedTasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onTaskUpdated={onTaskUpdated}
                            onTaskDeleted={onTaskDeleted}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
