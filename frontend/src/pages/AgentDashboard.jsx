import { useEffect, useState } from "react";
import api from "../api/axios";
import FieldList from "../components/FieldList";

export default function AgentDashboard() {
  const [data, setData] = useState(null);

  const fetchDashboard = () => {
    api.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#94d6c0",
      padding: "2rem",
      fontFamily: "Inter, sans-serif",
      lineHeight: "1.4",
      
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem"
        }}>
          <div>
            <h2 style={{ margin: 0 }}>🌱 SmartSeason</h2>
            <p style={{ margin: 0, color: "#666" }}>
              Field Agent Dashboard
            </p>
          </div>

          <button onClick={handleLogout} style={{
            background: "#e63946",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}>
            Logout
          </button>
        </div>

        {/* Stats */}
        {data && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "2rem"
          }}>
            <StatCard label="Total Fields" value={data.total_fields} />
            <StatCard label="Active" value={data.status_breakdown.Active} color="#2a9d8f" />
            <StatCard label="At Risk" value={data.status_breakdown["At Risk"]} color="#e63946" />
            <StatCard label="Completed" value={data.status_breakdown.Completed} color="#6c757d" />
          </div>
        )}

        <FieldList isAgent={true} onUpdate={fetchDashboard} />

      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: "white",
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      textAlign: "center"
    }}>
      <p style={{ color: "#666" }}>{label}</p>
      <h3 style={{ margin: 0, color: color || "#333" }}>{value}</h3>
    </div>
  );
}
