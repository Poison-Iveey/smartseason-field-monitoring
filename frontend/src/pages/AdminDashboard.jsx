import { useEffect, useState } from "react";
import api from "../api/axios";
import FieldList from "../components/FieldList";
import CreateField from "../components/CreateField";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fetchDashboard = () => {
    api.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDashboard();
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <div style={{
        width: isMobile ? "100%" : "240px",
        minHeight: isMobile ? "auto" : "100vh",
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(12px)",
        color: "white",
        padding: "1rem",
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10
      }}>
        <div>
          <h2 style={{ marginBottom: isMobile ? "0" : "2rem" }}>🌱 SmartSeason</h2>
          {!isMobile && (
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
          flexDirection: isMobile ? "row" : "column",
          marginTop: isMobile ? "0" : "auto"
        }}>
          <button onClick={() => setDarkMode(prev => !prev)} style={styles.sidebarBtn}>Toggle Mode</button>
          <button onClick={handleLogout} style={styles.sidebarBtn}>Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{
        flex: 1,
        width: "100%",
        padding: "1.5rem",
        minHeight: "100vh",
        overflowY: "auto",
        background: darkMode
          ? "linear-gradient(135deg, #0b1f17, #123a2a, #0b1f17)"
          : "linear-gradient(135deg, #1a3a2a, #2e5941, #1a3a2a)",
        marginLeft: isMobile ? 0 : "240px"
      }}>
        {data && (
          <>
            <h2>Admin Dashboard</h2>

            <div style={styles.grid}>
              <StatCard label="Total Fields" value={data.total_fields} />
              <StatCard label="Active" value={data.status_breakdown.Active} />
              <StatCard label="At Risk" value={data.status_breakdown["At Risk"]} />
              <StatCard label="Completed" value={data.status_breakdown.Completed} />
            </div>

            <div style={{ marginTop: "2rem" }}>
              <CreateField onCreate={fetchDashboard} />
            </div>

            <div style={{ marginTop: "2rem" }}>
              <FieldList isAgent={false} onUpdate={fetchDashboard} />
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
  sidebarBtn: {
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