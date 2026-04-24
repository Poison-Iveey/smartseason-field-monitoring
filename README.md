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

### Demo Login Credentials

To test the application, use the following accounts:

#### Admin Account
Email: yvettechristine245@gmail.com
Password: mishap4110

#### Agent Accounts
Email: christineyvett0@gmail.com
Password: mishap4110

Email: catherinefiona@gmail.com
Password: mishap4110

### NOTE
These credentials are for demo/testing purposes only
Authentication is role-based using JWT/session-based login

## System Roles & Permissions

#### Admin
Can view all fields
Can create new fields
Can assign fields to agents
Can view all updates and crop statuses

#### Agent
Can view all fields (read-only access)
Can only update fields assigned to them
Cannot create or reassign fields

### Field Access Rules
Each field is assigned to a specific agent by the admin
Agents can only update:
-Growth stage
-Field notes
-Status updates
- Field risk status is automatically determined based on updates (e.g. missed updates)

### Future Improvements
- Full update history (not just latest)
- Charts for seasonal trends
- Notifications for "At Risk" fields
- Image uploads from agents
- Deployment on cloud(Azure)

### Live link
Access the live deployment on this link https://smartseason-field-monitoring-delta.vercel.app/

### Author
Yvette Christine 

### screenshots
<img width="1125" height="764" alt="image" src="https://github.com/user-attachments/assets/70007856-ca00-4174-85de-94a506f37eeb" />
<img width="1126" height="764" alt="Screenshot from 2026-04-24 19-04-11" src="https://github.com/user-attachments/assets/624d35de-3f75-4e6f-af3a-16c0a62a33b2" />




