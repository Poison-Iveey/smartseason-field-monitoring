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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
  <div>
    <h2 style={{ marginBottom: window.innerWidth > 768 ? "2rem" : "0" }}>
      🌱 SmartSeason
    </h2>

    {window.innerWidth > 768 && (
      <>
        <p style={{ opacity: 0.7 }}>Dashboard</p>
        <p style={{ opacity: 0.7 }}>Fields</p>
        <p style={{ opacity: 0.7 }}>Performance</p>
      </>
    )}
  </div>

  <div style={{
    display: "flex",
    gap: "0.5rem",
    flexDirection: window.innerWidth > 768 ? "column" : "row"
  }}>
    <button
      onClick={() => setDarkMode(prev => !prev)}
      style={styles.sidebarBtn}
    >
      Toggle Mode
    </button>

    <button onClick={handleLogout} style={styles.logoutBtn}>
      Logout
    </button>
  </div>
</div>

      {/* MAIN */}
      <div style={{
        marginLeft: window.innerWidth > 768 ? "240px" : "0",
        marginTop: window.innerWidth > 768 ? "0" : "80px",
        width: "100%",
        height: "100vh",
        overflowY: "auto",
        padding: "1.5rem",
        background: darkMode
          ? "linear-gradient(135deg, #0b1f17, #123a2a, #0b1f17)"
          : "linear-gradient(135deg, #1a3a2a, #2e5941, #1a3a2a)"
      }}>

        {data && (
          <>
            <h2>Agent Dashboard</h2>

            <div style={styles.grid}>
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
    <div style={styles.card}>
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}

const styles = {
  sidebar: {
  width: window.innerWidth > 768 ? "240px" : "100%",
  height: window.innerWidth > 768 ? "100vh" : "auto",
  background: "rgba(0,0,0,0.25)",
  backdropFilter: "blur(12px)",
  color: "white",
  padding: "1rem",
  position: window.innerWidth > 768 ? "fixed" : "relative",
  display: "flex",
  flexDirection: window.innerWidth > 768 ? "column" : "row",
  alignItems: "center",
  justifyContent: window.innerWidth > 768 ? "flex-start" : "space-between",
  zIndex: 10
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
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem"
  },

  card: {
    background: "rgba(15,47,31,0.65)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "1rem",
    borderRadius: "12px"
  }
};