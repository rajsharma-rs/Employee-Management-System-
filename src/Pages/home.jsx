import React, { use } from 'react';
import { useState,useEffect } from 'react';

export default function HomePage() {
  // State for user data
  const [user , setUser] = useState({
    name: "",
    role: ""
  });
  useEffect(() => { 
      const loggeduser = localStorage.getItem("user");
      if (loggeduser) { const nameOnly = loggeduser.split('@')[0]; // Extract name from email
        setUser({
          name: nameOnly,
          role: "client "
        });
      }
    }, []);

  // State for task filter
  const [taskFilter, setTaskFilter] = useState('All Tasks');

  // State for all tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Q4 Sales Report",
      description: "Analyze sales data and create comprehensive report",
      priority: "High Priority",
      priorityColor: "teal",
      dueDate: "Dec 15, 2024",
      completed: false,
      status: "pending"
    },
    {
      id: 2,
      title: "Update Employee Database",
      description: "Review and update employee information records",
      priority: "Medium Priority",
      priorityColor: "blue",
      dueDate: "Dec 18, 2024",
      completed: false,
      status: "in-progress"
    },
    {
      id: 3,
      title: "Client Meeting Preparation",
      description: "Prepare presentation for ABC Corp meeting",
      priority: "Completed",
      priorityColor: "green",
      dueDate: "Dec 10, 2024",
      completed: true,
      status: "completed"
    },
    {
      id: 4,
      title: "Team Training Session",
      description: "Conduct onboarding for new team members",
      priority: "Low Priority",
      priorityColor: "purple",
      dueDate: "Dec 20, 2024",
      completed: false,
      status: "pending"
    },
    {
      id: 5,
      title: "Code Review - Feature Branch",
      description: "Review pull requests and provide feedback",
      priority: "High Priority",
      priorityColor: "teal",
      dueDate: "Dec 14, 2024",
      completed: false,
      status: "in-progress"
    },
    {
      id: 6,
      title: "Documentation Update",
      description: "Update API documentation with new endpoints",
      priority: "Medium Priority",
      priorityColor: "blue",
      dueDate: "Dec 19, 2024",
      completed: false,
      status: "pending"
    },
    {
      id: 7,
      title: "Bug Fix - Login Module",
      description: "Fix authentication bug in production",
      priority: "Completed",
      priorityColor: "green",
      dueDate: "Dec 8, 2024",
      completed: true,
      status: "completed"
    }
  ]);

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        return {
          ...task,
          completed: newCompleted,
          status: newCompleted ? 'completed' : 'pending',
          priority: newCompleted ? 'Completed' : task.priority,
          priorityColor: newCompleted ? 'green' : task.priorityColor
        };
      }
      return task;
    }));
  };

  // Filter tasks based on selected filter
  const getFilteredTasks = () => {
    switch(taskFilter) {
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'Pending':
        return tasks.filter(task => !task.completed && task.status === 'pending');
      case 'In Progress':
        return tasks.filter(task => !task.completed && task.status === 'in-progress');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  // Get first name from full name
  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  // Calculate stats
  var stats = {
    hoursWorked: "38.5h",
    tasksCompleted: tasks.filter(t => t.completed).length,
    attendanceRate: "100%",
    attendanceDays: "20/20",
    pendingTasks: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Outfit', sans-serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
        .delay-600 { animation-delay: 0.6s; opacity: 0; }
      `}</style>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main Content - Full Screen */}
      <main className="relative z-10 p-8 max-w-480 mx-auto">
        
        {/* Header */}
        <header className="mb-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">
                Welcome back, {getFirstName(user.name)}! 👋
              </h1>
              <p className="text-gray-400 text-lg">Here's your overview for today • {user.role}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white/5 backdrop-blur-lg border border-white/10 p-3 rounded-xl text-white hover:bg-white/10 transition-all relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full"></span>
              </button>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center font-semibold text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className="text-gray-400 text-xs">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          
          {/* Hours Worked */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 animate-fade-in-up delay-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-linear-to-br from-teal-400 to-cyan-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-green-400 text-sm font-semibold">This Week</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Hours Worked</h3>
            <p className="text-white text-4xl font-bold">{stats.hoursWorked}</p>
          </div>

          {/* Tasks Completed */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-linear-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12%
              </span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Tasks Completed</h3>
            <p className="text-white text-4xl font-bold">{stats.tasksCompleted}</p>
          </div>

          {/* Attendance Rate */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 animate-fade-in-up delay-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-linear-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-green-400 text-sm font-semibold">{stats.attendanceRate}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Attendance Rate</h3>
            <p className="text-white text-4xl font-bold">{stats.attendanceDays}</p>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 animate-fade-in-up delay-400">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-linear-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-yellow-400 text-sm font-semibold">Due Soon</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Pending Tasks</h3>
            <p className="text-white text-4xl font-bold">{stats.pendingTasks}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          
          {/* My Tasks Section */}
          <div className="xl:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 animate-fade-in-up delay-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">My Tasks</h2>
                <p className="text-gray-400 text-sm">
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </p>
              </div>
              <select 
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
                className="bg-white/5 backdrop-blur-lg border border-white/10 px-5 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer"
              >
                <option>All Tasks</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>
            
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400 text-lg">No tasks found in "{taskFilter}"</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-150rflow-y-auto pr-2 custom-scrollbar">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <input 
                          type="checkbox" 
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="mt-1 w-5 h-5 bg-slate-900/50 border-slate-700/50 rounded text-teal-500 focus:ring-2 focus:ring-teal-500/20 cursor-pointer" 
                        />
                        <div className="flex-1">
                          <h4 className={`text-white font-semibold mb-2 text-lg ${task.completed ? 'line-through opacity-60' : ''}`}>
                            {task.title}
                          </h4>
                          <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                          <div className="flex items-center gap-3 text-xs flex-wrap">
                            <span className={`bg-${task.priorityColor}-500/20 text-${task.priorityColor}-400 px-3 py-1.5 rounded-full font-medium`}>
                              {task.priority}
                            </span>
                            <span className="text-gray-400 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {task.completed ? `Completed on ${task.dueDate}` : `Due: ${task.dueDate}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Attendance Overview */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 animate-fade-in-up delay-500">
            <h2 className="text-3xl font-bold text-white mb-6">Attendance</h2>
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-40 h-40 bg-linear-to-br from-teal-500 to-cyan-600 rounded-full mb-4 shadow-lg shadow-teal-500/50">
                  <div className="text-white">
                    <p className="text-5xl font-bold">100%</p>
                    <p className="text-sm">This Month</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-gray-400">Days Present</span>
                  <span className="text-white font-bold text-xl">20</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-gray-400">Days Absent</span>
                  <span className="text-white font-bold text-xl">0</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-gray-400">On Leave</span>
                  <span className="text-white font-bold text-xl">0</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-gray-400">Late Arrivals</span>
                  <span className="text-white font-bold text-xl">2</span>
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-4 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all text-base">
                View Full Report
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity & Upcoming Events */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 animate-fade-in-up delay-600">
            <h2 className="text-3xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-brrom-teal-400 to-cyan-600 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-base">Task "Q3 Report" completed</p>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-base">Checked in at 9:00 AM</p>
                  <p className="text-gray-400 text-sm">Today</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-base">New task assigned: Database Update</p>
                  <p className="text-gray-400 text-sm">Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-base">Leave request approved</p>
                  <p className="text-gray-400 text-sm">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 animate-fade-in-up delay-600">
            <h2 className="text-3xl font-bold text-white mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-teal-500/30 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-semibold text-lg">Team Meeting</h4>
                  <span className="bg-teal-500/20 text-teal-400 text-xs px-3 py-1.5 rounded-full font-medium">Today</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Monthly sync-up with the team</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  2:00 PM - 3:00 PM
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-semibold text-lg">Client Presentation</h4>
                  <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1.5 rounded-full font-medium">Tomorrow</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Quarterly review with ABC Corp</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  10:00 AM - 11:30 AM
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-semibold text-lg">Training Workshop</h4>
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1.5 rounded-full font-medium">Dec 20</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">New software tools training</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  9:00 AM - 12:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(20, 184, 166, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 184, 166, 0.7);
        }
      `}</style>
    </div>
  );
}