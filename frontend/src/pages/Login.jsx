import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import plantImg from "../assets/plant.jpg";

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

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

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
      display: "flex",
      width: "100vw",
      overflow: "hidden",
      height: "100vh",
      fontFamily: "Inter, sans-serif"
    }}>

      {/* LEFT SIDE */}
      <div style={{
        flex: 1,
        background: "linear-gradient(135deg, #0f2f1f, #1f4d35)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          fontWeight: "600"
        }}>
          🌱 SmartSeason
        </h1>

        <p style={{
          fontSize: "1.1rem",
          maxWidth: "400px",
          color: "#cfd8d3"
        }}>
          Monitor crop fields, track growth stages, and manage agricultural data efficiently.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={{
        flex: 1,
        backgroundImage: `url(${plantImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>

        {/* GLASS LOGIN CARD */}
        <div style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.15)",
          padding: "2rem",
          borderRadius: "16px",
          width: "320px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          color: "white"
        }}>

          <h2 style={{
            textAlign: "center",
            marginBottom: "1.5rem"
          }}>
            Login
          </h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "none",
                outline: "none"
              }}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "none",
                outline: "none"
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#4a7c59",
                color: "white",
                border: "none",
                padding: "0.8rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
