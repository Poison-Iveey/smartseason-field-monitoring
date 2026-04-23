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

      // resest
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

  return (
    <div style={{
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      marginBottom: "2rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }}>
      <h3>Create New Field</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Field Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Crop Type"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          required
        /><br /><br />

        <input
          type="date"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
          required
        /><br /><br />

        <select
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

        <br /><br />

        <button type="submit">Create Field</button>
      </form>
    </div>
  );
}
