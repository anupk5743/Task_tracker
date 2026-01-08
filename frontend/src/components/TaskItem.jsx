import { useState, useEffect } from 'react';
import { updateTask, deleteTask } from '../services/api';
import './TaskItem.css';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
    });

    // Sync editData when task changes (but not when editing)
    useEffect(() => {
        if (!isEditing) {
            setEditData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
            });
        }
    }, [task, isEditing]);

    const handleUpdate = async () => {
        try {
            await updateTask(task._id, editData);
            onTaskUpdated();
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task');
        }
    };

    const handleDelete = async () => {
        console.log('Delete button clicked for task:', task._id);
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                console.log('Sending delete request for task ID:', task._id);
                const response = await deleteTask(task._id);
                console.log('Delete response:', response);
                onTaskDeleted();
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task: ' + (error.response?.data?.message || error.message));
            }
        } else {
            console.log('Delete cancelled by user');
        }
    };

    const formatDate = (date) => {
        if (!date) return 'No due date';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'completed':
                return 'status-completed';
            case 'in-progress':
                return 'status-in-progress';
            default:
                return 'status-pending';
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            default:
                return 'priority-low';
        }
    };

    if (isEditing) {
        return (
            <div className="task-item editing">
                <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="edit-input"
                />
                <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="edit-textarea"
                    rows="3"
                />
                <div className="edit-selects">
                    <select
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select
                        value={editData.priority}
                        onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="edit-actions">
                    <button onClick={handleUpdate} className="save-btn">Save</button>
                    <button onClick={() => {
                        setIsEditing(false);
                        // Reset editData to current task values on cancel
                        setEditData({
                            title: task.title,
                            description: task.description || '',
                            status: task.status,
                            priority: task.priority,
                        });
                    }} className="cancel-btn">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`task-item ${getStatusClass(task.status)}`}>
            <div className="task-header">
                <h3 className="task-title" title={task.title}>{task.title}</h3>
                <div className="task-badges">
                    <span className={`badge priority-badge ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                    </span>
                    <span className={`badge status-badge ${getStatusClass(task.status)}`}>
                        {task.status}
                    </span>
                </div>
            </div>

            {task.description && (
                <p className="task-description" title={task.description}>
                    {task.description}
                </p>
            )}

            <div className="task-meta">
                <div className="meta-item">
                    <strong>Due:</strong> {formatDate(task.dueDate)}
                </div>
                {task.assignedTo && (
                    <div className="meta-item">
                        <strong>Assigned to:</strong> {task.assignedTo}
                    </div>
                )}
            </div>

            {task.tags && task.tags.length > 0 && (
                <div className="task-tags">
                    {task.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="task-actions">
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                    Edit Task
                </button>
                <button onClick={handleDelete} className="delete-btn">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
