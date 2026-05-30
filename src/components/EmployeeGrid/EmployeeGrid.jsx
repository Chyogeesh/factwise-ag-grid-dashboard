import React, { useRef, useCallback, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Search, X } from 'lucide-react';
import styles from './EmployeeGrid.module.css';

ModuleRegistry.registerModules([AllCommunityModule]);

function NameCellRenderer({ data }) {
  const initials = `${data.firstName[0]}${data.lastName[0]}`;
  const colors = ['#2b5ea7', '#c4531a', '#1a6b3c', '#7b3aad', '#b5860d'];
  const color = colors[data.id % colors.length];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '100%' }}>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-display)' }}>
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.2 }}>{data.firstName} {data.lastName}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{data.email}</div>
      </div>
    </div>
  );
}

function StatusCellRenderer({ value }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 11.5, fontWeight: 600, background: value ? 'color-mix(in srgb, #1a6b3c 12%, transparent)' : 'color-mix(in srgb, #b83232 12%, transparent)', color: value ? '#1a6b3c' : '#b83232' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: value ? '#1a6b3c' : '#b83232', display: 'inline-block' }} />
      {value ? 'Active' : 'Inactive'}
    </span>
  );
}

function RatingCellRenderer({ value }) {
  let color;
  if (value >= 4.5) color = 'var(--rating-excellent)';
  else if (value >= 4.0) color = 'var(--rating-good)';
  else if (value >= 3.5) color = 'var(--rating-average)';
  else color = 'var(--rating-poor)';
  return <span style={{ fontWeight: 700, color, fontSize: 13, fontFamily: 'var(--font-display)' }}>★ {value.toFixed(1)}</span>;
}

function SalaryCellRenderer({ value }) {
  return <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13 }}>${value.toLocaleString()}</span>;
}

const DEPT_COLORS = { Engineering: '#2b5ea7', Marketing: '#c4531a', Sales: '#1a6b3c', HR: '#7b3aad', Finance: '#b5860d' };

function DeptCellRenderer({ value }) {
  const color = DEPT_COLORS[value] || '#555';
  return <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 11.5, fontWeight: 600, background: `${color}18`, color }}>{value}</span>;
}

function SkillsCellRenderer({ value }) {
  if (!value?.length) return null;
  const display = value.slice(0, 2);
  const rest = value.length - 2;
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
      {display.map(s => <span key={s} style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--border)', color: 'var(--text-secondary)', fontSize: 11, fontWeight: 500 }}>{s}</span>)}
      {rest > 0 && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>+{rest}</span>}
    </div>
  );
}

const columnDefs = [
  { headerName: 'Employee', field: 'firstName', cellRenderer: NameCellRenderer, minWidth: 220, flex: 2, sortable: true, filter: true, comparator: (_, __, nodeA, nodeB) => nodeA.data.lastName.localeCompare(nodeB.data.lastName) },
  { headerName: 'Department', field: 'department', cellRenderer: DeptCellRenderer, minWidth: 130, flex: 1, sortable: true, filter: true },
  { headerName: 'Position', field: 'position', minWidth: 170, flex: 1.5, sortable: true, filter: true, cellStyle: { color: 'var(--text-secondary)', fontSize: 13 } },
  { headerName: 'Location', field: 'location', minWidth: 110, flex: 1, sortable: true, filter: true, cellStyle: { color: 'var(--text-secondary)', fontSize: 13 } },
  { headerName: 'Salary', field: 'salary', cellRenderer: SalaryCellRenderer, minWidth: 120, flex: 1, sortable: true, filter: 'agNumberColumnFilter' },
  { headerName: 'Rating', field: 'performanceRating', cellRenderer: RatingCellRenderer, minWidth: 110, flex: 1, sortable: true, filter: 'agNumberColumnFilter' },
  { headerName: 'Projects', field: 'projectsCompleted', minWidth: 100, flex: 0.8, sortable: true, filter: 'agNumberColumnFilter', cellStyle: { fontWeight: 600, fontSize: 13 } },
  { headerName: 'Skills', field: 'skills', cellRenderer: SkillsCellRenderer, minWidth: 180, flex: 1.5, sortable: false, filter: false },
  { headerName: 'Status', field: 'isActive', cellRenderer: StatusCellRenderer, minWidth: 110, flex: 0.9, sortable: true, filter: true },
];

const defaultColDef = {
  resizable: true, sortable: true, filter: true,
  cellStyle: { display: 'flex', alignItems: 'center' },
};

export default function EmployeeGrid({ employees, gridRef: externalRef }) {
  const [quickFilter, setQuickFilter] = useState('');
  const internalRef = useRef();
  const gridRef = externalRef || internalRef;

  const onGridReady = useCallback(() => {
    gridRef.current?.api?.sizeColumnsToFit();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.tableInfo}>
          <h2 className={styles.title}>Employee Directory</h2>
          <span className={styles.count}>{employees.length} records</span>
        </div>
        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} />
          <input type="text" placeholder="Search employees…" value={quickFilter} onChange={e => setQuickFilter(e.target.value)} className={styles.searchInput} />
          {quickFilter && <button className={styles.clearBtn} onClick={() => setQuickFilter('')}><X size={13} /></button>}
        </div>
      </div>
      <div className={`ag-theme-alpine ${styles.gridWrap}`}>
        <AgGridReact
          ref={gridRef}
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilter}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20]}
          onGridReady={onGridReady}
          animateRows={true}
          rowHeight={52}
          headerHeight={44}
        />
      </div>
    </div>
  );
}
