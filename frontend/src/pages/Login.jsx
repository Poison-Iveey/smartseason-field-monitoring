import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import plantImg from "../assets/plant.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // DEMO FILL FUNCTIONS
  const fillAdminDemo = () => {
    setEmail("admin@shambarecords.demo");
    setPassword("Admin@123");
  };
  
  const fillAgentDemo = () => {
  setEmail("agent.demo@shambarecords.demo");
  setPassword("Agent@123");
  };

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
      flexDirection: window.innerWidth < 768 ? "column" : "row" ,
      width: "100vw",
      overflowX: "hidden",
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
        padding: "4rem",
        width: window.innerWidth < 768 ? "100%" : "50%"
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
        justifyContent: "center",
        padding: "1rem",
        width: "100%"
      }}>

        {/* GLASS LOGIN CARD */}
        <div style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.15)",
          padding: "2rem",
          borderRadius: "16px",
          width: "90%",
          maxWidth: "360Px",
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
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                fontSize: "16px"
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

          {/*  DEMO BUTTONS */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Try Demo:</p>

            <button
              onClick={fillAdminDemo}
              style={{
                marginRight: "10px",
                padding: "0.5rem 0.8rem",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Admin Demo
            </button>

            <button
              onClick={fillAgentDemo}
              style={{
                padding: "0.5rem 0.8rem",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Agent Demo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}