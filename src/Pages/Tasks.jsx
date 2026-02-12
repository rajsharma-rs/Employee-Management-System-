import React from 'react'

import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Complete Q4 Sales Report",
    description: "Analyze sales data and create a comprehensive quarterly report including charts, trends, and forecasts for the next quarter.",
    priority: "High",
    status: "pending",
    dueDate: "2024-12-15",
    category: "Reports",
    assignedBy: "Manager - Alex Smith",
    createdAt: "2024-12-01",
    subtasks: [
      { id: 1, title: "Collect raw sales data", done: true },
      { id: 2, title: "Create charts and graphs", done: false },
      { id: 3, title: "Write executive summary", done: false },
    ],
    comments: [
      { id: 1, author: "Alex Smith", text: "Please include Q3 comparison data.", time: "2 days ago" },
    ],
  },
  {
    id: 2,
    title: "Update Employee Database",
    description: "Review and update all employee records including contact info, department changes, and role updates.",
    priority: "Medium",
    status: "in-progress",
    dueDate: "2024-12-18",
    category: "Admin",
    assignedBy: "Manager - Alex Smith",
    createdAt: "2024-12-03",
    subtasks: [
      { id: 1, title: "Export current database", done: true },
      { id: 2, title: "Verify contact information", done: true },
      { id: 3, title: "Update department records", done: false },
    ],
    comments: [],
  },
  {
    id: 3,
    title: "Client Meeting Preparation",
    description: "Prepare slides, talking points, and demo materials for ABC Corp quarterly review.",
    priority: "High",
    status: "completed",
    dueDate: "2024-12-10",
    category: "Meetings",
    assignedBy: "Manager - Sarah Lee",
    createdAt: "2024-12-05",
    subtasks: [
      { id: 1, title: "Create presentation slides", done: true },
      { id: 2, title: "Prepare demo environment", done: true },
      { id: 3, title: "Send agenda to client", done: true },
    ],
    comments: [
      { id: 1, author: "Sarah Lee", text: "Great job on this one!", time: "1 day ago" },
    ],
  },
  {
    id: 4,
    title: "Team Training Session",
    description: "Conduct onboarding and tool training for the 3 newly joined team members.",
    priority: "Low",
    status: "pending",
    dueDate: "2024-12-20",
    category: "Training",
    assignedBy: "Manager - Alex Smith",
    createdAt: "2024-12-06",
    subtasks: [
      { id: 1, title: "Prepare training material", done: false },
      { id: 2, title: "Set up demo accounts", done: false },
    ],
    comments: [],
  },
  {
    id: 5,
    title: "Code Review - Feature Branch",
    description: "Review and approve pull requests for the new authentication feature and provide detailed feedback.",
    priority: "High",
    status: "in-progress",
    dueDate: "2024-12-14",
    category: "Development",
    assignedBy: "Manager - Sarah Lee",
    createdAt: "2024-12-07",
    subtasks: [
      { id: 1, title: "Review login module", done: true },
      { id: 2, title: "Review token handling", done: false },
      { id: 3, title: "Test edge cases", done: false },
    ],
    comments: [
      { id: 1, author: "Dev Bot", text: "CI/CD pipeline passed successfully.", time: "3 hours ago" },
    ],
  },
  {
    id: 6,
    title: "Documentation Update",
    description: "Update the internal API documentation to reflect all new endpoints added in the last sprint.",
    priority: "Medium",
    status: "pending",
    dueDate: "2024-12-19",
    category: "Development",
    assignedBy: "Manager - Alex Smith",
    createdAt: "2024-12-08",
    subtasks: [
      { id: 1, title: "List all new endpoints", done: false },
      { id: 2, title: "Write usage examples", done: false },
    ],
    comments: [],
  },
];

const priorityConfig = {
  High:   { bg: "bg-red-500/20",    text: "text-red-400",    border: "border-red-500/30",    dot: "bg-red-400"    },
  Medium: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30", dot: "bg-yellow-400" },
  Low:    { bg: "bg-blue-500/20",   text: "text-blue-400",   border: "border-blue-500/30",   dot: "bg-blue-400"   },
};

const statusConfig = {
  pending:     { bg: "bg-gray-500/20",  text: "text-gray-300",   label: "Pending"     },
  "in-progress":{ bg: "bg-cyan-500/20", text: "text-cyan-400",   label: "In Progress" },
  completed:   { bg: "bg-green-500/20", text: "text-green-400",  label: "Completed"   },
};

 function Tasks() {
  const [tasks, setTasks]               = useState(initialTasks);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery]   = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [newComment, setNewComment]     = useState("");
  const [newSubtask, setNewSubtask]     = useState("");
  const [editingTask, setEditingTask]   = useState(null);
  const [view, setView]                 = useState("grid"); /*  list*/

  /*New task form state*/ 
  const emptyForm = { title: "", description: "", priority: "Medium", status: "pending", dueDate: "", category: "", assignedBy: "" };
  const [form, setForm] = useState(emptyForm);

  /*Derived filtered tasks*/ 
  const filtered = tasks.filter(t => {
    const matchStatus   = filterStatus   === "all" || t.status   === filterStatus;
    const matchPriority = filterPriority === "all" || t.priority === filterPriority;
    const matchSearch   = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchPriority && matchSearch;
  });

  /*Stats*/ 
  const stats = {
    total:      tasks.length,
    completed:  tasks.filter(t => t.status === "completed").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    pending:    tasks.filter(t => t.status === "pending").length,
  };

  /*Handlers*/ 
  const toggleSubtask = (taskId, subId) => {
    const update = (t) =>
      t.id === taskId
        ? { ...t, subtasks: t.subtasks.map(s => s.id === subId ? { ...s, done: !s.done } : s) }
        : t;
    setTasks(tasks.map(update));
    if (selectedTask?.id === taskId) setSelectedTask(update(selectedTask));
  };

  const changeStatus = (taskId, status) => {
    const update = (t) => t.id === taskId ? { ...t, status } : t;
    setTasks(tasks.map(update));
    if (selectedTask?.id === taskId) setSelectedTask(prev => ({ ...prev, status }));
  };

  const addComment = (taskId) => {
    if (!newComment.trim()) return;
    const comment = { id: Date.now(), author: "You", text: newComment.trim(), time: "Just now" };
    const update = (t) => t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t;
    setTasks(tasks.map(update));
    if (selectedTask?.id === taskId) setSelectedTask(prev => ({ ...prev, comments: [...prev.comments, comment] }));
    setNewComment("");
  };

  const addSubtask = (taskId) => {
    if (!newSubtask.trim()) return;
    const sub = { id: Date.now(), title: newSubtask.trim(), done: false };
    const update = (t) => t.id === taskId ? { ...t, subtasks: [...t.subtasks, sub] } : t;
    setTasks(tasks.map(update));
    if (selectedTask?.id === taskId) setSelectedTask(prev => ({ ...prev, subtasks: [...prev.subtasks, sub] }));
    setNewSubtask("");
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    if (selectedTask?.id === taskId) setSelectedTask(null);
    setShowDeleteConfirm(null);
  };

  const saveTask = () => {
    if (!form.title.trim()) return;
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask ? { ...t, ...form } : t));
      if (selectedTask?.id === editingTask) setSelectedTask(prev => ({ ...prev, ...form }));
    } else {
      const newTask = {
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
        subtasks: [],
        comments: [],
      };
      setTasks([...tasks, newTask]);
    }
    setForm(emptyForm);
    setEditingTask(null);
    setShowAddModal(false);
  };

  const openEdit = (task) => {
    setForm({ title: task.title, description: task.description, priority: task.priority,
              status: task.status, dueDate: task.dueDate, category: task.category, assignedBy: task.assignedBy });
    setEditingTask(task.id);
    setShowAddModal(true);
  };

  const progress = (task) => {
    if (!task.subtasks.length) return 0;
    return Math.round((task.subtasks.filter(s => s.done).length / task.subtasks.length) * 100);
  };

  const inputCls = "w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        html, body, #root { margin:0; padding:0; background:#0f172a; min-height:100vh; }
        * { font-family:'Inter',sans-serif; box-sizing:border-box; }
        h1,h2,h3,h4,h5,h6 { font-family:'Outfit',sans-serif; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        .fade-in-up  { animation:fadeInUp .5s ease-out forwards; }
        .fade-in     { animation:fadeIn .3s ease-out forwards; }
        .d1{animation-delay:.05s;opacity:0} .d2{animation-delay:.1s;opacity:0}
        .d3{animation-delay:.15s;opacity:0} .d4{animation-delay:.2s;opacity:0}
        .d5{animation-delay:.25s;opacity:0} .d6{animation-delay:.3s;opacity:0}
        .scrollbar::-webkit-scrollbar{width:5px}
        .scrollbar::-webkit-scrollbar-track{background:rgba(255,255,255,.05);border-radius:10px}
        .scrollbar::-webkit-scrollbar-thumb{background:rgba(20,184,166,.4);border-radius:10px}
        .scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(20,184,166,.6)}
      `}</style>

      <div className="min-h-screen w-full bg-linear-to-brrom-slate-900 via-slate-800 to-slate-900">
        {/* Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 p-8">
          {/* Page Header  */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 fade-in-up">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">My Tasks</h1>
              <p className="text-gray-400 text-lg">Manage and track all your assigned tasks</p>
            </div>
            <button
              onClick={() => { setForm(emptyForm); setEditingTask(null); setShowAddModal(true); }}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Task
            </button>
          </div>

          {/* Stats Row  */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label:"Total Tasks",   value:stats.total,      color:"from-teal-400 to-cyan-600",    icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", cls:"d1" },
              { label:"In Progress",   value:stats.inProgress, color:"from-cyan-400 to-blue-600",    icon:"M13 10V3L4 14h7v7l9-11h-7z", cls:"d2" },
              { label:"Completed",     value:stats.completed,  color:"from-green-400 to-emerald-600",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", cls:"d3" },
              { label:"Pending",       value:stats.pending,    color:"from-purple-400 to-pink-600",  icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", cls:"d4" },
            ].map(s => (
              <div key={s.label} className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition-all fade-in-up ${s.cls}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-linear-to-br ${s.color} rounded-xl flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{s.label}</p>
                <p className="text-white text-4xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filters Bar  */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 mb-6 flex flex-col lg:flex-row gap-4 fade-in-up d5">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer min-w-40"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer min-w-40"
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-slate-800/50 border border-white/10 rounded-xl p-1">
              <button onClick={() => setView("grid")} className={`p-2 rounded-lg transition-all ${view==="grid" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-all ${view==="list" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Task Count  */}
          <p className="text-gray-400 mb-4 fade-in-up d6">
            Showing <span className="text-white font-semibold">{filtered.length}</span> of <span className="text-white font-semibold">{tasks.length}</span> tasks
          </p>

          {/* Task Grid / List */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
              <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-400 text-xl">No tasks match your filters</p>
              <button onClick={() => { setFilterStatus("all"); setFilterPriority("all"); setSearchQuery(""); }}
                className="mt-4 px-6 py-2 bg-teal-500/20 text-teal-400 rounded-xl hover:bg-teal-500/30 transition-all">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {filtered.map((task, i) => (
                <div
                  key={task.id}
                  className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:-translate-y-1 hover:border-teal-500/30 transition-all cursor-pointer fade-in-up`}
                  style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
                  onClick={() => setSelectedTask(task)}
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${priorityConfig[task.priority].bg} ${priorityConfig[task.priority].text}`}>
                        {task.priority}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusConfig[task.status].bg} ${statusConfig[task.status].text}`}>
                        {statusConfig[task.status].label}
                      </span>
                    </div>
                    <div className="flex gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                      <button onClick={() => openEdit(task)} className="p-1.5 text-gray-400 hover:text-teal-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => setShowDeleteConfirm(task.id)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-2 leading-snug">{task.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>

                  {/* Progress */}
                  {task.subtasks.length > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{progress(task)}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress(task)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{task.subtasks.filter(s=>s.done).length}/{task.subtasks.length} subtasks done</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {task.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {task.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      {task.comments.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 
            TASK DETAIL PANEL (right drawer)
            */}
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTask(null)} />

            {/* Panel */}
            <div className="w-full max-w-2xl h-full bg-slate-900 border-l border-white/10 overflow-y-auto scrollbar fade-in flex flex-col">
              {/* Panel Header */}
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-white/10 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${priorityConfig[selectedTask.priority].bg} ${priorityConfig[selectedTask.priority].text}`}>
                    {selectedTask.priority}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusConfig[selectedTask.status].bg} ${statusConfig[selectedTask.status].text}`}>
                    {statusConfig[selectedTask.status].label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(selectedTask)} className="p-2 text-gray-400 hover:text-teal-400 hover:bg-white/5 rounded-lg transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => setSelectedTask(null)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 flex-1 space-y-6">
                {/* Title + Description */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">{selectedTask.title}</h2>
                  <p className="text-gray-400 leading-relaxed">{selectedTask.description}</p>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label:"Due Date",    value:selectedTask.dueDate,    icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { label:"Category",   value:selectedTask.category,   icon:"M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
                    { label:"Assigned By",value:selectedTask.assignedBy, icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                    { label:"Created",    value:selectedTask.createdAt,  icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  ].map(m => (
                    <div key={m.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.icon} />
                        </svg>
                        <span className="text-gray-400 text-xs">{m.label}</span>
                      </div>
                      <p className="text-white font-semibold text-sm">{m.value || "—"}</p>
                    </div>
                  ))}
                </div>

                {/* Change Status */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm mb-3">Change Status</p>
                  <div className="flex gap-2 flex-wrap">
                    {(["pending","in-progress","completed"]).map(s => (
                      <button
                        key={s}
                        onClick={() => changeStatus(selectedTask.id, s)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedTask.status === s
                          ? "bg-linear-to-r from-teal-500 to-cyan-600 text-white"
                          : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"}`}
                      >
                        {statusConfig[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtasks */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-lg">Subtasks</h3>
                    <span className="text-gray-400 text-sm">{selectedTask.subtasks.filter(s=>s.done).length}/{selectedTask.subtasks.length} done</span>
                  </div>

                  {/* Progress bar */}
                  {selectedTask.subtasks.length > 0 && (
                    <div className="mb-4">
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress(selectedTask)}%` }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{progress(selectedTask)}% complete</p>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {selectedTask.subtasks.map(sub => (
                      <div key={sub.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                        onClick={() => toggleSubtask(selectedTask.id, sub.id)}>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${sub.done ? "bg-teal-500 border-teal-500" : "border-gray-500"}`}>
                          {sub.done && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm transition-all ${sub.done ? "line-through text-gray-500" : "text-white"}`}>{sub.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add subtask */}
                  <div className="flex gap-2">
                    <input
                      value={newSubtask}
                      onChange={e => setNewSubtask(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addSubtask(selectedTask.id)}
                      placeholder="Add a subtask..."
                      className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    />
                    <button onClick={() => addSubtask(selectedTask.id)}
                      className="px-4 py-2.5 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                      Add
                    </button>
                  </div>
                </div>

                {/* Comments */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h3 className="text-white font-bold text-lg mb-4">Comments ({selectedTask.comments.length})</h3>

                  <div className="space-y-3 mb-4">
                    {selectedTask.comments.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-4">No comments yet</p>
                    )}
                    {selectedTask.comments.map(c => (
                      <div key={c.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 bg-linear-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {c.author[0]}
                          </div>
                          <span className="text-white font-semibold text-sm">{c.author}</span>
                          <span className="text-gray-500 text-xs ml-auto">{c.time}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add comment */}
                  <div className="flex gap-2">
                    <input
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addComment(selectedTask.id)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    />
                    <button onClick={() => addComment(selectedTask.id)}
                      className="px-4 py-2.5 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 
            ADD / EDIT 
            */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <div className="relative w-full max-w-lg bg-slate-900 rounded-2xl border border-white/10 shadow-2xl fade-in p-6 max-h-[90vh] overflow-y-auto scrollbar">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{editingTask ? "Edit Task" : "Add New Task"}</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    placeholder="Task title" className={inputCls} />
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    placeholder="Task description" rows={3} className={inputCls + " resize-none"} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 text-sm font-medium mb-2 block">Priority</label>
                    <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} className={inputCls}>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium mb-2 block">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={inputCls}>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 text-sm font-medium mb-2 block">Due Date</label>
                    <input type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium mb-2 block">Category</label>
                    <input value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      placeholder="e.g. Development" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Assigned By</label>
                  <input value={form.assignedBy} onChange={e => setForm({...form, assignedBy: e.target.value})}
                    placeholder="Manager name" className={inputCls} />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                  Cancel
                </button>
                <button onClick={saveTask}
                  className="flex-1 py-3 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                  {editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/*
            DELETE CONFIRM MODAL
          */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)} />
            <div className="relative w-full max-w-sm bg-slate-900 rounded-2xl border border-white/10 shadow-2xl fade-in p-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl text-center mb-2">Delete Task?</h3>
              <p className="text-gray-400 text-center text-sm mb-6">This action cannot be undone. The task will be permanently deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                  Cancel
                </button>
                <button onClick={() => deleteTask(showDeleteConfirm)}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all">
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

export default Tasks
