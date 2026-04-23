# 🌱 SmartSeason – Field Monitoring System

SmartSeason is a full-stack web application that helps agricultural teams track crop field progress, monitor risks, and manage field updates in real time.

It supports two roles:
- **Admin** – creates fields, assigns agents, monitors all activity
- **Agent** – updates field progress and logs notes from the field

---

##  Features

###  Authentication
- Secure login with JWT
- Role-based access (Admin vs Agent)

###  Field Management (Admin)
- Create new fields
- Assign fields to agents
- View all fields across the system

###  Agent Workflow
- View assigned fields
- Update field stage (Planted, Growing, Harvesting)
- Add notes (e.g. crop health, issues)

###  Dashboard
- Total fields count
- Status breakdown:
  - Active
  - At Risk
  - Completed
- Auto-refresh every 5 seconds

###  Field Updates
- Latest update note displayed per field
- Visible to both Admin and Agent

---

##  Tech Stack

### Frontend
- React (Vite)
- Axios
- Inline styling (responsive UI)

### Backend
- Node.js
- Express.js
- Sequelize ORM

### Database
- MySQL

---
### How It Works 

- Admin creates a field and assigns it to an agent
- Agent visits the field and submits updates (stage + notes)
- System calculates field status (Active / At Risk / Completed)
- Admin dashboard reflects real-time updates

### Deployment Plan
- Backend → Render
- Frontend → vercel

### Future Improvements
- Full update history (not just latest)
- Charts for seasonal trends
- Notifications for "At Risk" fields
- Image uploads from agents
- Deployment on cloud(Azure)

### Author
Yvette Christine 

### screenshots



