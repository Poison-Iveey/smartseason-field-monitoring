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

  return (
    <div style={{ marginTop: "1rem" }}>
      
      <select
        value={stage}
        onChange={(e) => setStage(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
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
        style={{
          width: "100%",
          padding: "0.5rem",
          marginTop: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleUpdate}
        style={{
          marginTop: "1rem",
          width: "100%",
          background: "#2a9d8f",
          color: "white",
          border: "none",
          padding: "0.6rem",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Update Field
      </button>
    </div>
  );
}

