/*import { useEffect, useState } from "react";
import api from "../api/axios";
import UpdateField from "./UpdateField";

export default function FieldList({ isAgent, onUpdate }) {
  const [fields, setFields] = useState([]);

  const fetchFields = () => {
    api.get("/fields")
      .then(res => setFields(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchFields();
    const interval = setInterval(fetchFields, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: "1.5rem", color: "#0f2f1f" }}>
        🌾 Fields Overview
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem"
      }}>
        {fields.map((field) => (
          <div
            key={field.id}
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              color: "white",
              padding: "1.6rem",
              borderRadius: "14px",
              border: "1px solid #e0ece6",
              boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
              transition: "all 0.25s ease",
              borderLeft: `6px solid ${
                field.status === "Active"
                  ? "#2a9d8f"
                  : field.status === "At Risk"
                  ? "#e63946"
                  : "#6c757d"
              }`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.04)";
            }}
          >

            <h4 style={{ marginBottom: "0.5rem", color: "#0f2f1f" }}>
              {field.name}
            </h4>

            <p>🌱 {field.crop_type}</p>
            <p>🌿 {field.current_stage}</p>
            <p>📅 {new Date(field.planting_date).toLocaleDateString()}</p>

            <p>
              Status:{" "}
              <strong style={{
                color:
                  field.status === "Active"
                    ? "#2a9d8f"
                    : field.status === "At Risk"
                    ? "#e63946"
                    : "#6c757d"
              }}>
                {field.status}
              </strong>
            </p>

            {field.latestNote && (
              <div style={{
                marginTop: "0.8rem",
                background: "#eef5f1",
                padding: "0.6rem",
                borderRadius: "8px"
              }}>
                📝 {field.latestNote}
              </div>
            )}

            {isAgent && (
              <UpdateField
                fieldId={field.id}
                onUpdate={() => {
                  fetchFields();
                  onUpdate && onUpdate();
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}*/


import { useEffect, useState } from "react";
import api from "../api/axios";
import UpdateField from "./UpdateField";

export default function FieldList({ isAgent, onUpdate }) {
  const [fields, setFields] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fetchFields = () => {
    api.get("/fields")
      .then(res => setFields(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchFields();
    const interval = setInterval(fetchFields, 5000);

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <h3 style={styles.title}>Fields</h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(200px, 1fr))" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.5rem"
      }}>
        {fields.map(field => (
          <div key={field.id} style={styles.card}>

            {/* IMAGE LAYER */}
            <div style={styles.imageBg}></div>

            {/* CONTENT */}
            <div style={styles.content}>
              <div style={styles.header}>
                <h4 style={styles.name}>{field.name}</h4>
                <span style={{
                  ...styles.status,
                  background:
                    field.status === "Active"
                      ? "#2a9d8f"
                      : field.status === "At Risk"
                      ? "#e63946"
                      : "#6c757d"
                }}>
                  {field.status}
                </span>
              </div>

              <p style={styles.text}><b>Crop:</b> {field.crop_type}</p>
              <p style={styles.text}><b>Stage:</b> {field.current_stage}</p>
              <p style={styles.text}>
                <b>Date:</b> {new Date(field.planting_date).toLocaleDateString()}
              </p>

              {field.latestNote && (
                <div style={styles.note}>
                  📝 {field.latestNote}
                </div>
              )}

              {isAgent && (
                <UpdateField
                  fieldId={field.id}
                  onUpdate={() => {
                    fetchFields();
                    onUpdate && onUpdate();
                  }}
                />
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  title: {
    color: "#0f2f1f",
    marginBottom: "1rem",
    fontWeight: "700"
  },
  card: {
    position: "relative",
    borderRadius: "14px",
    overflow: "hidden",
    padding: "1.5rem",
    background: "rgba(15, 47, 31, 0.65)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
    color: "white"
  },
  imageBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('https://i.pinimg.com/1200x/24/e0/3c/24e03ce4d4762dcbc3980ce4a49983f6.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.25
  },
  content: {
    position: "relative",
    zIndex: 2
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem"
  },
  name: {
    margin: 0,
    color: "white",
    fontWeight: "700"
  },
  text: {
    color: "#f3f4f6",
    margin: "0.3rem 0"
  },
  status: {
    padding: "0.3rem 0.7rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    color: "white"
  },
  note: {
    marginTop: "0.8rem",
    padding: "0.6rem",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "10px",
    color: "white"
  }
};