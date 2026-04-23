import { useEffect, useState } from "react";
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
      <h3 style={{ marginBottom: "1rem" }}>Fields</h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem"
      }}>
        {fields.map((field) => (
          <div key={field.id} style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}>
            <h4 style={{ marginBottom: "0.5rem" }}>{field.name}</h4>

            <p style={{ margin: 0, color: "#666" }}>
              Crop: {field.crop_type}
            </p>

            <p style={{ margin: 0, color: "#666" }}>
              Stage: {field.current_stage}
            </p>

            <p style={{ margin: 0, color: "#666" }}>
              Planted: {new Date(field.planting_date).toLocaleDateString()}
            </p>

            <p style={{ marginTop: "0.5rem" }}>
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
                marginTop: "0.5rem",
                fontStyle: "italic",
                color: "#555",
                background: "#f1f5f4",
                padding: "0.5rem",
                borderRadius: "6px"
              }}>
                <strong>📝 Latest Update:</strong>
                <div>{field.latestNote}</div>
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
}
