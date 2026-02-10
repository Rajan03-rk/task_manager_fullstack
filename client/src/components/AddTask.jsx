import { useState } from "react";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const submitTask = async (e) => {
    e.preventDefault();

    await onAdd({
      title,
      description,
      priority,
      dueDate: dueDate || null
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
  };

  return (
    <form className="add-task" onSubmit={submitTask}>
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button className="primary">Add Task</button>
    </form>
  );
}

export default AddTask;
