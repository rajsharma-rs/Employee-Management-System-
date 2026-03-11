import React, { use } from 'react';
import  { useState, useEffect } from 'react';

// ============================================================================
// EMS ADMIN PANEL - LAPTOP & DESKTOP OPTIMIZED
// React.js + Tailwind CSS
// Full-featured employee management with all CRUD operations
// ============================================================================

export default function AdminDashboard() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('ems_admin_employees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return getInitialEmployees();
      }
    }
    return getInitialEmployees();
  });

  const [leaveRequests, setLeaveRequests] = useState(() => {
    const saved = localStorage.getItem('ems_admin_leaves');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return getInitialLeaveRequests();
      }
    }
    return getInitialLeaveRequests();
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    salary: '',
    phone: '',
    status: 'active',
  });

  // ═══════════════════════════════════════════════════════════════════════
  // INITIAL DATA
  // ═══════════════════════════════════════════════════════════════════════

  function getInitialEmployees() {
    return [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        role: 'Senior Developer',
        department: 'Engineering',
        status: 'active',
        salary: 95000,
        joinDate: '2022-01-15',
        phone: '+1 234-567-8901',
        performance: 92,
        tasksCompleted: 45,
        totalTasks: 50,
        attendanceRate: 98,
        projects: ['E-commerce Platform', 'Mobile App'],
        skills: ['React', 'Node.js', 'MongoDB'],
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.c@company.com',
        role: 'Product Manager',
        department: 'Product',
        status: 'active',
        salary: 110000,
        joinDate: '2021-06-20',
        phone: '+1 234-567-8902',
        performance: 88,
        tasksCompleted: 38,
        totalTasks: 42,
        attendanceRate: 95,
        projects: ['Product Roadmap', 'User Research'],
        skills: ['Strategy', 'Agile', 'Analytics'],
      },
      {
        id: 3,
        name: 'Emily Davis',
        email: 'emily.d@company.com',
        role: 'UX Designer',
        department: 'Design',
        status: 'active',
        salary: 85000,
        joinDate: '2022-08-10',
        phone: '+1 234-567-8903',
        performance: 94,
        tasksCompleted: 52,
        totalTasks: 55,
        attendanceRate: 97,
        projects: ['Design System', 'UI Redesign'],
        skills: ['Figma', 'UI/UX', 'Prototyping'],
      },
      {
        id: 4,
        name: 'James Wilson',
        email: 'james.w@company.com',
        role: 'DevOps Engineer',
        department: 'Engineering',
        status: 'on-leave',
        salary: 100000,
        joinDate: '2021-03-15',
        phone: '+1 234-567-8904',
        performance: 85,
        tasksCompleted: 30,
        totalTasks: 40,
        attendanceRate: 90,
        projects: ['CI/CD Pipeline', 'Infrastructure'],
        skills: ['Docker', 'Kubernetes', 'AWS'],
      },
      {
        id: 5,
        name: 'Lisa Anderson',
        email: 'lisa.a@company.com',
        role: 'Marketing Manager',
        department: 'Marketing',
        status: 'active',
        salary: 90000,
        joinDate: '2022-11-05',
        phone: '+1 234-567-8905',
        performance: 90,
        tasksCompleted: 42,
        totalTasks: 45,
        attendanceRate: 96,
        projects: ['Brand Campaign', 'Social Media'],
        skills: ['Digital Marketing', 'SEO'],
      },
      {
        id: 6,
        name: 'David Martinez',
        email: 'david.m@company.com',
        role: 'QA Engineer',
        department: 'Engineering',
        status: 'active',
        salary: 80000,
        joinDate: '2023-02-20',
        phone: '+1 234-567-8906',
        performance: 87,
        tasksCompleted: 55,
        totalTasks: 60,
        attendanceRate: 94,
        projects: ['Test Automation'],
        skills: ['Selenium', 'Jest', 'Testing'],
      },
    ];
  }

  function getInitialLeaveRequests() {
    return [
      {
        id: 1,
        employeeId: 4,
        employeeName: 'James Wilson',
        type: 'Sick Leave',
        startDate: '2024-12-10',
        endDate: '2024-12-15',
        days: 5,
        status: 'approved',
        reason: 'Medical treatment',
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: 'Michael Chen',
        type: 'Vacation',
        startDate: '2024-12-20',
        endDate: '2024-12-27',
        days: 7,
        status: 'pending',
        reason: 'Family vacation',
      },
      {
        id: 3,
        employeeId: 3,
        employeeName: 'Emily Davis',
        type: 'Personal',
        startDate: '2024-12-18',
        endDate: '2024-12-18',
        days: 1,
        status: 'pending',
        reason: 'Personal work',
      },
    ];
  }

  // ═══════════════════════════════════════════════════════════════════════
  // EFFECTS
  // ═══════════════════════════════════════════════════════════════════════

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('ems_admin_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('ems_admin_leaves', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  // ═══════════════════════════════════════════════════════════════════════
  // COMPUTED VALUES
  // ═══════════════════════════════════════════════════════════════════════

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'active').length,
    onLeave: employees.filter(e => e.status === 'on-leave').length,
    inactive: employees.filter(e => e.status === 'inactive').length,
    avgPerformance: employees.length > 0 
      ? Math.round(employees.reduce((acc, e) => acc + e.performance, 0) / employees.length) 
      : 0,
    pendingLeaves: leaveRequests.filter(r => r.status === 'pending').length,
  };

  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDepartment === 'all' || emp.department === filterDepartment;
    const matchStatus = filterStatus === 'all' || emp.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const uniqueDepartments = [...new Set(employees.map(e => e.department))];

  // ═══════════════════════════════════════════════════════════════════════
  // FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.department) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    
    const employee = {
      ...newEmployee,
      id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
      joinDate: new Date().toISOString().split('T')[0],
      performance: 0,
      tasksCompleted: 0,
      totalTasks: 0,
      attendanceRate: 100,
      projects: [],
      skills: [],
      salary: parseInt(newEmployee.salary) || 0,
    };
    
    setEmployees([...employees, employee]);
    setShowAddModal(false);
    setNewEmployee({ name: '', email: '', role: '', department: '', salary: '', phone: '', status: 'active' });
    showToast('✅ Employee added successfully!');
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
    setShowDeleteConfirm(null);
    setSelectedEmployee(null);
    showToast('Employee removed successfully');
  };

  const handleStatusChange = (id, newStatus) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, status: newStatus } : e));
    showToast(`Employee status updated to ${newStatus}`);
  };

  const handleLeaveAction = (id, action) => {
    setLeaveRequests(leaveRequests.map(r => 
      r.id === id ? { ...r, status: action } : r
    ));
    showToast(`Leave request ${action}!`);
  };

  if (!mounted) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #14b8a6',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .scrollbar::-webkit-scrollbar-thumb {
          background: rgba(20, 184, 166, 0.5);
          border-radius: 10px;
        }
        
        .scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 184, 166, 0.7);
        }
      `}</style>

      <div style={{ 
        minHeight: '100vh', 
        display: 'flex',
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
        color: '#ffffff'
      }}>
        
        {/* Toast */}
        {toast && (
          <div style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '16px 24px',
            borderRadius: '12px',
            background: toast.type === 'error' ? '#ef4444' : 'linear-gradient(to right, #14b8a6, #06b6d4)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            animation: 'slideIn 0.3s ease-out'
          }}>
            {toast.msg}
          </div>
        )}

        {/* Sidebar */}
        <div style={{
          width: sidebarCollapsed ? '80px' : '280px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0
        }}>
          {/* Logo */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {!sidebarCollapsed && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>EMS Admin</h2>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Management Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                padding: '8px',
                background: 'rgba(20, 184, 166, 0.2)',
                border: 'none',
                borderRadius: '8px',
                color: '#14b8a6',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(20, 184, 166, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(20, 184, 166, 0.2)'}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '16px', overflowY: 'auto' }} className="scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { id: 'employees', label: 'Employees', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { id: 'departments', label: 'Departments', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { id: 'performance', label: 'Performance', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'leaves', label: 'Leave Requests', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '8px',
                  background: activeTab === item.id ? 'linear-gradient(to right, #14b8a6, #06b6d4)' : 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  color: activeTab === item.id ? '#ffffff' : '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  fontWeight: activeTab === item.id ? 600 : 500,
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#94a3b8';
                  }
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div style={{
              padding: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(to bottom right, #14b8a6, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 700
              }}>
                A
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>Admin User</p>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>admin@ems.com</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '32px'
        }} className="scrollbar">
          
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'employees' && 'Employee Management'}
              {activeTab === 'departments' && 'Departments'}
              {activeTab === 'performance' && 'Performance Analytics'}
              {activeTab === 'leaves' && 'Leave Requests'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '16px' }}>
              Manage your team and monitor performance
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {[
              { label: 'Total Employees', value: stats.total, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { label: 'Active', value: stats.active, color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'On Leave', value: stats.onLeave, color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { label: 'Avg Performance', value: `${stats.avgPerformance}%`, color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <svg width="28" height="28" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '4px' }}>{stat.label}</p>
                <p style={{ fontSize: '32px', fontWeight: 800 }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'employees' && (
            <div>
              {/* Filters */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '300px',
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Departments</option>
                  {uniqueDepartments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(to right, #14b8a6, #06b6d4)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Employee
                </button>
              </div>

              {/* Employee Table */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <div style={{ overflowX: 'auto' }} className="scrollbar">
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Employee</th>
                        <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Role</th>
                        <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Department</th>
                        <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Performance</th>
                        <th style={{ padding: '16px', textAlign: 'right', color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((emp) => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                fontWeight: 700
                              }}>
                                {emp.name.charAt(0)}
                              </div>
                              <div>
                                <p style={{ fontWeight: 600, fontSize: '14px' }}>{emp.name}</p>
                                <p style={{ fontSize: '12px', color: '#94a3b8' }}>{emp.email}</p>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '16px', fontSize: '14px' }}>{emp.role}</td>
                          <td style={{ padding: '16px', fontSize: '14px' }}>{emp.department}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: emp.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 
                                         emp.status === 'on-leave' ? 'rgba(59, 130, 246, 0.2)' : 
                                         'rgba(239, 68, 68, 0.2)',
                              color: emp.status === 'active' ? '#22c55e' : 
                                     emp.status === 'on-leave' ? '#3b82f6' : 
                                     '#ef4444'
                            }}>
                              {emp.status}
                            </span>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{
                                  height: '100%',
                                  width: `${emp.performance}%`,
                                  background: emp.performance >= 90 ? '#22c55e' : emp.performance >= 75 ? '#3b82f6' : '#f59e0b',
                                  borderRadius: '3px'
                                }}></div>
                              </div>
                              <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '40px' }}>{emp.performance}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setSelectedEmployee(emp)}
                                style={{
                                  padding: '8px',
                                  background: 'rgba(59, 130, 246, 0.2)',
                                  border: 'none',
                                  borderRadius: '8px',
                                  color: '#3b82f6',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'}
                              >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(emp.id)}
                                style={{
                                  padding: '8px',
                                  background: 'rgba(239, 68, 68, 0.2)',
                                  border: 'none',
                                  borderRadius: '8px',
                                  color: '#ef4444',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                              >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {activeTab !== 'employees' && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '48px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '18px', color: '#94a3b8' }}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content will be displayed here
              </p>
            </div>
          )}
        </div>

        {/* Modals */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            padding: '16px'
          }}>
            <div style={{
              background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }} className="scrollbar">
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Add New Employee</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Full Name', key: 'name', type: 'text', required: true },
                  { label: 'Email', key: 'email', type: 'email', required: true },
                  { label: 'Role', key: 'role', type: 'text', required: true },
                  { label: 'Department', key: 'department', type: 'text', required: true },
                  { label: 'Phone', key: 'phone', type: 'tel' },
                  { label: 'Salary', key: 'salary', type: 'number' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                      {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                    </label>
                    <input
                      type={field.type}
                      value={newEmployee[field.key]}
                      onChange={(e) => setNewEmployee({ ...newEmployee, [field.key]: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: 'linear-gradient(to right, #14b8a6, #06b6d4)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            padding: '16px'
          }}>
            <div style={{
              background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="32" height="32" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Delete Employee?</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
                This action cannot be undone. The employee will be permanently removed.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEmployee(showDeleteConfirm)}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}