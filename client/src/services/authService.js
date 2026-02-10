import API from "./api";

export const loginUser = async ({ email, password }) => {
  const res = await API.post("/auth/login", {
    email: email.trim().toLowerCase(),
    password,
  });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data;
};

export const registerUser = async ({ email, password }) => {
  const res = await API.post("/auth/register", {
    email: email.trim().toLowerCase(),
    password,
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
