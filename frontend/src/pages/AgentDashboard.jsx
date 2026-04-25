import { useEffect, useState } from "react";
import api from "../api/axios";
import FieldList from "../components/FieldList";

export default function AgentDashboard() {
  const [data, setData] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

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
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "2rem" }}>🌱 SmartSeason</h2>

        <p style={{ opacity: 0.7 }}>My Fields</p>
        <p style={{ opacity: 0.7 }}>Performance</p>

        <button
          onClick={() => setDarkMode(prev => !prev)}
          style={styles.sidebarBtn}
        >
          Toggle Mode
        </button>

        <div style={{ marginTop: "auto" }}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{
         marginLeft: "240px",
         width: "100%",
         padding: "2rem",
         minHeight: "100vh",
         background: darkMode
    ? "linear-gradient(135deg, #0b1f17, #123a2a, #0b1f17)"
    : "linear-gradient(135deg, #1a3a2a, #2e5941, #1a3a2a)"
      }}>

        {data && (
          <>
            <h2>Agent Dashboard</h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem"
            }}>
              <StatCard label="Total Fields" value={data.total_fields} />
              <StatCard label="Active" value={data.status_breakdown.Active} />
              <StatCard label="At Risk" value={data.status_breakdown["At Risk"]} />
              <StatCard label="Completed" value={data.status_breakdown.Completed} />
            </div>

            <div style={{ marginTop: "2rem" }}>
              <FieldList isAgent={true} onUpdate={fetchDashboard} />
            </div>
          </>
        )}

      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{
      background: "rgba(15,47,31,0.65)",
      backdropFilter: "blur(10px)",
      color: "white",
      padding: "1rem",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
    }}>
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(12px)",
    color: "white",
    padding: "1.5rem",
    position: "fixed",
    display: "flex",
    flexDirection: "column"
  },

  sidebarBtn: {
    marginTop: "1rem",
    padding: "0.6rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#2a9d8f",
    color: "white"
  },

  logoutBtn: {
    marginTop: "1rem",
    padding: "0.6rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#2a9d8f",
    color: "white"
  }
};