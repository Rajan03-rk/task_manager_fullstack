import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { getTasks, addTaskAPI, updateTaskAPI, deleteTaskAPI } from "../services/taskService";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        alert(err?.response?.data?.message || "Failed to load tasks. Check backend.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addTask = async (task) => {
    const saved = await addTaskAPI(task);
    setTasks((prev) => [saved, ...prev]);
  };

  const deleteTask = async (id) => {
    await deleteTaskAPI(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    const updated = await updateTaskAPI(id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div>
      <Navbar />

      <div className="pro-dashboard">
        <div className="pro-header">
          <div>
            <h1>Dashboard</h1>
            <p className="muted">Manage your tasks like a professional system.</p>
          </div>

          <div className="pro-stats">
            <div className="stat">
              <span className="muted">Total</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="stat">
              <span className="muted">Active</span>
              <strong>{stats.active}</strong>
            </div>
            <div className="stat">
              <span className="muted">Completed</span>
              <strong>{stats.completed}</strong>
            </div>
          </div>
        </div>

        <div className="pro-grid">
          <div className="pro-panel">
            <h2>Create Task</h2>
            <AddTask onAdd={addTask} />
          </div>

          <div className="pro-panel">
            <div className="pro-toolbar">
              <h2>My Tasks</h2>
              <div className="filters">
                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                  All
                </button>
                <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>
                  Active
                </button>
                <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
                  Completed
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading tasks…</div>
            ) : filtered.length === 0 ? (
              <div className="empty">No tasks found.</div>
            ) : (
              <div className="task-list">
                {filtered.map((task) => (
                  <TaskCard key={task._id} task={task} onDelete={deleteTask} onToggle={toggleTask} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
