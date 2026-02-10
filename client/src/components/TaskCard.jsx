function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-head">
        <h3>{task.title}</h3>
        <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-footer">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={!!task.completed}
            onChange={() => onToggle(task._id)}
          />
          <span>Done</span>
        </label>

        <button className="danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
