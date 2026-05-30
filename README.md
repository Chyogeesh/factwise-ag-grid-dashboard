# factwise-ag-grid-dashboard
Employee Analytics Dashboard built with React, AG Grid, and Recharts featuring sorting, filtering, pagination, search, CSV export, and responsive design.
------------------------------------------------
| Employee Analytics Dashboard                |
------------------------------------------------

| Total Employees | Avg Salary | Avg Rating |
|      20         |  $87,000   |    4.2     |

------------------------------------------------
| Department Distribution Chart               |
------------------------------------------------

------------------------------------------------
| AG Grid Employee Table                      |
------------------------------------------------

Features:
✓ Search
✓ Sorting
✓ Filtering
✓ Pagination
✓ Export CSV
✓ Dark/Light Theme
✓ Status Badges
✓ Performance Colors
React
Vite
AG Grid
Material UI
Recharts
React Icons
src/
├── components/
│   ├── Navbar/           Sticky nav — logo, Export CSV, dark mode toggle
│   ├── DashboardCards/   4 KPI cards with glassmorphism hover effect
│   ├── DepartmentChart/  Recharts horizontal bar chart w/ custom tooltip
│   └── EmployeeGrid/     Full AG Grid with all features
├── data/employees.js     20-record dataset
├── hooks/useTheme.js     Theme hook with localStorage persistence
├── styles/global.css     CSS design token system + AG Grid overrides
└── App.jsx               Root layout + Top Performers leaderboard
# FactWise Dashboard

Employee Analytics Dashboard built using:

- React
- AG Grid
- Material UI
- Recharts

Features:

- AG Grid Table
- Sorting
- Filtering
- Pagination
- CSV Export
- Search
- Dashboard Analytics
- Responsive UI

Run Project:

npm install
npm run dev
# FactWise Employee Analytics Dashboard

Built with React + Vite + AG Grid Community for the FactWise Frontend SDE Assessment.

## Setup

npm install
npm run dev

Open http://localhost:5173

## Features
- AG Grid: sort, filter, pagination, quick search, CSV export, column resize
- 4 KPI cards: Total, Active Employees, Avg Salary, Avg Rating
- Department bar chart (Recharts)
- Top 5 Performers leaderboard
- Dark mode toggle
- Status badges, salary formatting, rating color coding
- Fully responsive

Built by Challagondla Yogeesh Sai
