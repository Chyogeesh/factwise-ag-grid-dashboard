import React, { useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import DashboardCards from './components/DashboardCards/DashboardCards';
import DepartmentChart from './components/DepartmentChart/DepartmentChart';
import EmployeeGrid from './components/EmployeeGrid/EmployeeGrid';
import { employees } from './data/employees';
import { useTheme } from './hooks/useTheme';
import styles from './App.module.css';

/**
 * App — root layout component.
 * Holds the AG Grid ref so the Navbar's Export CSV button
 * can trigger ag-grid's built-in CSV export API.
 */
export default function App() {
  const { theme, toggleTheme } = useTheme();
  const gridRef = useRef();

  // Trigger AG Grid's native CSV export
  const handleExportCSV = () => {
    gridRef.current?.api?.exportDataAsCsv({
      fileName: 'factwise-employees.csv',
      // Export all columns including hidden ones
      allColumns: false,
      // Skip the custom cell renderers — export raw values
      processCellCallback: ({ value }) => value,
    });
  };

  return (
    <div className={styles.app}>
      {/* ─── Navigation ─────────────────────────────────────────── */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onExportCSV={handleExportCSV}
      />

      {/* ─── Main Content ────────────────────────────────────────── */}
      <main className={styles.main}>
        {/* Page header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>People Analytics</h1>
            <p className={styles.pageSubtitle}>
              A real-time view across your organisation's {employees.length} employees
            </p>
          </div>
          <div className={styles.dataBadge}>
            <span className={styles.liveIndicator} />
            Live Data
          </div>
        </div>

        {/* ─── KPI Cards ─────────────────────────────────────────── */}
        <DashboardCards employees={employees} />

        {/* ─── Chart + Grid Row ─────────────────────────────────── */}
        <div className={styles.midRow}>
          <div className={styles.chartCol}>
            <DepartmentChart employees={employees} />
          </div>
          <div className={styles.statsCol}>
            <TopPerformers employees={employees} />
          </div>
        </div>

        {/* ─── AG Grid ───────────────────────────────────────────── */}
        <EmployeeGrid employees={employees} gridRef={gridRef} />
      </main>

      <footer className={styles.footer}>
        <span>FactWise Assessment · Built by Challagondla Yogeesh Sai</span>
      </footer>
    </div>
  );
}

/* ─── Inline mini-component: Top Performers ──────────────────────── */
function TopPerformers({ employees }) {
  const top = [...employees]
    .sort((a, b) => b.performanceRating - a.performanceRating)
    .slice(0, 5);

  const DEPT_HEX = {
    Engineering: '#2b5ea7', Marketing: '#c4531a',
    Sales: '#1a6b3c', HR: '#7b3aad', Finance: '#b5860d',
  };

  return (
    <div className={styles.topCard}>
      <div className={styles.topCardHeader}>
        <h2 className={styles.topCardTitle}>Top Performers</h2>
        <p className={styles.topCardSub}>Ranked by rating</p>
      </div>
      <ol className={styles.perfList}>
        {top.map((e, i) => (
          <li key={e.id} className={styles.perfItem}>
            <span className={styles.perfRank}>#{i + 1}</span>
            <div className={styles.perfAvatar} style={{ background: DEPT_HEX[e.department] }}>
              {e.firstName[0]}{e.lastName[0]}
            </div>
            <div className={styles.perfInfo}>
              <span className={styles.perfName}>{e.firstName} {e.lastName}</span>
              <span className={styles.perfRole}>{e.position}</span>
            </div>
            <span className={styles.perfScore}>★ {e.performanceRating}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
