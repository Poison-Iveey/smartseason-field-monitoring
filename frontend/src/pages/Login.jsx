import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // store auth
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/agent");
      }

    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#94d6c0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif"
    }}>
      
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        width: "320px"
      }}>
        
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, color: "#3f3d3d" }}>🌱 SmartSeason</h2>
          <p style={{ color: "#3f3d3d", fontSize: "0.9rem" }}>
            Field Monitoring System
          </p>
        </div>

        <form onSubmit={handleLogin}>
          
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              marginBottom: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              marginBottom: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2a9d8f",
              color: "white",
              border: "none",
              padding: "0.7rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
