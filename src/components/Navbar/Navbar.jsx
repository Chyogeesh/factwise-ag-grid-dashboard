import React from 'react';
import { Sun, Moon, Download, BarChart3 } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar({ theme, toggleTheme, onExportCSV }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.logoIcon}>
          <BarChart3 size={18} strokeWidth={2.5} />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>FactWise</span>
          <span className={styles.brandSub}>People Analytics</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.exportBtn} onClick={onExportCSV}>
          <Download size={15} strokeWidth={2.5} />
          <span>Export CSV</span>
        </button>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
        </button>
      </div>
    </nav>
  );
}
