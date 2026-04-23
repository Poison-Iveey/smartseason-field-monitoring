import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Agent */}
        <Route
          path="/agent"
          element={
            <ProtectedRoute role="agent">
              <AgentDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
