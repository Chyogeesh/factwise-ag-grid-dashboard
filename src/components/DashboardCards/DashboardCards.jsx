import React from 'react';
import { Users, UserCheck, DollarSign, Star } from 'lucide-react';
import styles from './DashboardCards.module.css';

function formatSalary(value) {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value}`;
}

function MetricCard({ icon: Icon, label, value, accent, sub }) {
  return (
    <div className={styles.card} style={{ '--card-accent': accent }}>
      <div className={styles.cardIcon}>
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardLabel}>{label}</span>
        <span className={styles.cardValue}>{value}</span>
        {sub && <span className={styles.cardSub}>{sub}</span>}
      </div>
      <div className={styles.accentBar} />
    </div>
  );
}

export default function DashboardCards({ employees }) {
  const total = employees.length;
  const active = employees.filter(e => e.isActive).length;
  const avgSalary = employees.reduce((s, e) => s + e.salary, 0) / total;
  const avgRating = employees.reduce((s, e) => s + e.performanceRating, 0) / total;

  const cards = [
    { icon: Users, label: 'Total Employees', value: total, accent: 'var(--accent-3)', sub: 'Across all departments' },
    { icon: UserCheck, label: 'Active Employees', value: active, accent: 'var(--accent)', sub: `${((active / total) * 100).toFixed(0)}% of workforce` },
    { icon: DollarSign, label: 'Avg. Salary', value: formatSalary(Math.round(avgSalary)), accent: 'var(--dept-finance)', sub: 'Annual compensation' },
    { icon: Star, label: 'Avg. Performance', value: avgRating.toFixed(2), accent: 'var(--accent-2)', sub: 'Out of 5.0 rating' },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <MetricCard key={card.label} {...card} />
      ))}
    </div>
  );
}
