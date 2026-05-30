import React, { useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import DashboardCards from './components/DashboardCards/DashboardCards';
import DepartmentChart from './components/DepartmentChart/DepartmentChart';
import EmployeeGrid from './components/EmployeeGrid/EmployeeGrid';
import { employees } from './data/employees';
import { useTheme } from './hooks/useTheme';
import styles from './App.module.css';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const gridRef = useRef();

  const handleExportCSV = () => {
    gridRef.current?.api?.exportDataAsCsv({
      fileName: 'factwise-employees.csv',
      allColumns: false,
      processCellCallback: ({ value }) => value,
    });
  };

  return (
    <div className={styles.app}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onExportCSV={handleExportCSV}
      />
      <main className={styles.main}>
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

        <DashboardCards employees={employees} />

        <div className={styles.midRow}>
          <div className={styles.chartCol}>
            <DepartmentChart employees={employees} />
          </div>
          <div className={styles.statsCol}>
            <TopPerformers employees={employees} />
          </div>
        </div>

        <EmployeeGrid employees={employees} gridRef={gridRef} />
      </main>

      <footer className={styles.footer}>
        <span>FactWise Assessment · Built by Challagondla Yogeesh Sai</span>
      </footer>
    </div>
  );
}

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
