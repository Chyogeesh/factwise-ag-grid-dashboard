import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import styles from './DepartmentChart.module.css';

const DEPT_HEX = {
  Engineering: '#2b5ea7', Marketing: '#c4531a',
  Sales: '#1a6b3c', HR: '#7b3aad', Finance: '#b5860d',
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { dept, count, avgSalary, avgRating } = payload[0].payload;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTitle}>{dept}</p>
      <p><span>Headcount</span><strong>{count}</strong></p>
      <p><span>Avg Salary</span><strong>${(avgSalary / 1000).toFixed(0)}K</strong></p>
      <p><span>Avg Rating</span><strong>{avgRating.toFixed(1)}</strong></p>
    </div>
  );
}

export default function DepartmentChart({ employees }) {
  const data = useMemo(() => {
    const map = {};
    employees.forEach(e => {
      if (!map[e.department]) map[e.department] = { count: 0, salarySum: 0, ratingSum: 0 };
      map[e.department].count++;
      map[e.department].salarySum += e.salary;
      map[e.department].ratingSum += e.performanceRating;
    });
    return Object.entries(map).map(([dept, v]) => ({
      dept, count: v.count,
      avgSalary: v.salarySum / v.count,
      avgRating: v.ratingSum / v.count,
    })).sort((a, b) => b.count - a.count);
  }, [employees]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Department Distribution</h2>
        <p className={styles.sub}>Headcount by team</p>
      </div>
      <div className={styles.legend}>
        {data.map(d => (
          <span key={d.dept} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: DEPT_HEX[d.dept] }} />
            {d.dept}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
          <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
          <YAxis dataKey="dept" type="category" width={90} tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--border-light)', opacity: 0.5 }} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={32}>
            {data.map(d => <Cell key={d.dept} fill={DEPT_HEX[d.dept]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
