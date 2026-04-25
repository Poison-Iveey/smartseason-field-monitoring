import { useState } from "react";
import api from "../api/axios";

export default function UpdateField({ fieldId, onUpdate }) {
  const [stage, setStage] = useState("Growing");
  const [note, setNote] = useState("");

  const handleUpdate = async () => {
    try {
      await api.post(`/updates/${fieldId}`, {
        stage,
        note,
      });

      setNote("");
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.7rem",
    borderRadius: "10px",
    border: "1px solid #dbe5df",
    outline: "none",
    fontSize: "0.9rem",
    marginBottom: "0.7rem"
  };

  return (
    <div style={{
      marginTop: "1.2rem",
      padding: "1rem",
      background: "#f3f8f5",
      borderRadius: "12px",
      border: "1px solid #e0ece6"
    }}>

      <h4 style={{
        marginBottom: "0.7rem",
        fontSize: "0.95rem",
        color: "#1f4d35"
      }}>
        ✏️ Update Field
      </h4>

      <select
        value={stage}
        onChange={(e) => setStage(e.target.value)}
        style={inputStyle}
      >
        <option>Planted</option>
        <option>Growing</option>
        <option>Ready</option>
        <option>Harvested</option>
      </select>

      <input
        value={note}
        placeholder="Add observation..."
        onChange={(e) => setNote(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={handleUpdate}
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #2a9d8f, #4a7c59)",
          color: "white",
          border: "none",
          padding: "0.7rem",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.3s"
        }}
      >
        Save Update
      </button>

    </div>
  );
}