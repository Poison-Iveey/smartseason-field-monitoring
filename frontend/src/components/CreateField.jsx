import { useState, useEffect } from "react";
import api from "../api/axios";

export default function CreateField({ onCreate }) {
  const [name, setName] = useState("");
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");

  useEffect(() => {
    api.get("/auth/users")
      .then(res => {
        const agentsOnly = res.data.filter(u => u.role === "agent");
        setAgents(agentsOnly);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/fields", {
        name,
        crop_type: cropType,
        planting_date: plantingDate,
        assigned_agent_id: agentId,
      });

      setName("");
      setCropType("");
      setPlantingDate("");
      setAgentId("");

      onCreate();
    } catch (err) {
      console.error(err);
      alert("Failed to create field");
    }
  };

  // Updated input style as requested
  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.2)",
    outline: "none",
    fontSize: "16px",
    background: "rgba(255,255,255,0.1)",
    color: "white"
  };

  return (
    <div style={{
      background: "rgba(15, 47, 31, 0.65)",
      backdropFilter: "blur(10px)",
      color: "white",
      borderRadius: "16px",
      padding: "2rem",
      boxShadow: "0 8px 30px rgba(0,0,0,0.05)"
    }}>
      <h3 style={{
        marginBottom: "1.5rem",
        color: "#0f2f1f"
      }}>
        🌱 Create New Field
      </h3>

      <form onSubmit={handleSubmit}>

        <input
          style={inputStyle}
          placeholder="Field Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          placeholder="Crop Type"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          type="date"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
          required
        />

        <select
          style={inputStyle}
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          required
        >
          <option value="">Assign Agent</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.email}
            </option>
          ))}
        </select>

        <button type="submit" style={{
          width: "100%",
          padding: "0.6rem",
          borderRadius: "8px",
          border: "none",
          background: "#2a9d8f",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "0.5rem",
          transition: "0.3s"
        }}>
          Create Field
        </button>

      </form>
    </div>
  );
}