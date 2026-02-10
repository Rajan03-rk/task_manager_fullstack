import API from "./api";
const STORAGE_KEY = "tasks";

export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

export const addTaskAPI = async (task) => {
  const res = await API.post("/tasks", task);
  return res.data;
};

export const updateTaskAPI = async (id, task) => {
  const res = await API.put(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTaskAPI = async (id) => {
  await API.delete(`/tasks/${id}`);
};


export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
