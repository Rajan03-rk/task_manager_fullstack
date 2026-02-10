import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleTheme = () => {
    document.body.classList.toggle("light");
    setDark(!dark);
  };

  return (
    <div className="navbar">
      <h2>Task Manager</h2>
      <div>
        <button onClick={toggleTheme}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;