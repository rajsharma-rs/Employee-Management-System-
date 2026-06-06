import React from 'react'

import { useState, useEffect } from "react";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// Generate last 30 days of mock attendance history
const generateHistory = () => {
  const history = {};
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const day = d.getDay();
    if (day === 0 || day === 6) continue; // skip weekends
    const rand = Math.random();
    if (rand < 0.75) {
      const h = 8 + Math.floor(Math.random() * 2);
      const m = Math.floor(Math.random() * 59).toString().padStart(2,"0");
      const outH = 17 + Math.floor(Math.random() * 2);
      const outM = Math.floor(Math.random() * 59).toString().padStart(2,"0");
      const late = h > 9 || (h === 9 && parseInt(m) > 5);
      history[key] = {
        status: late ? "late" : "present",
        checkIn:  `${h.toString().padStart(2,"0")}:${m} AM`,
        checkOut: `${outH}:${outM} PM`,
        hours: `${outH - h}h ${outM}m`,
      };
    } else if (rand < 0.85) {
      history[key] = { status: "absent",  checkIn: "--", checkOut: "--", hours: "0h" };
    } else {
      history[key] = { status: "leave",   checkIn: "--", checkOut: "--", hours: "0h" };
    }
  }
  return history;
};

const statusCfg = {
  present: { bg:"bg-green-500/20",  text:"text-green-400",  border:"border-green-500/30",  label:"Present",     dot:"bg-green-400"  },
  late:    { bg:"bg-yellow-500/20", text:"text-yellow-400", border:"border-yellow-500/30", label:"Late",        dot:"bg-yellow-400" },
  absent:  { bg:"bg-red-500/20",    text:"text-red-400",    border:"border-red-500/30",    label:"Absent",      dot:"bg-red-400"    },
  leave:   { bg:"bg-blue-500/20",   text:"text-blue-400",   border:"border-blue-500/30",   label:"On Leave",    dot:"bg-blue-400"   },
  holiday: { bg:"bg-purple-500/20", text:"text-purple-400", border:"border-purple-500/30", label:"Holiday",     dot:"bg-purple-400" },
  weekend: { bg:"bg-slate-500/20",  text:"text-slate-400",  border:"border-slate-500/30",  label:"Weekend",     dot:"bg-slate-400"  },
};

export default function AttendancePage() {
  const today     = new Date();
  const todayKey  = today.toISOString().split("T")[0];

  const [history, setHistory]           = useState(generateHistory);
  const [checkedIn, setCheckedIn]       = useState(false);
  const [checkInTime, setCheckInTime]   = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [liveTime, setLiveTime]         = useState(new Date());
  const [elapsed, setElapsed]           = useState(0); // seconds
  const [tab, setTab]                   = useState("overview"); // overview | calendar | history
  const [calMonth, setCalMonth]         = useState(today.getMonth());
  const [calYear, setCalYear]           = useState(today.getFullYear());
  const [selectedDay, setSelectedDay]   = useState(null);
  const [leaveModal, setLeaveModal]     = useState(false);
  const [leaveForm, setLeaveForm]       = useState({ type:"Sick Leave", from:"", to:"", reason:"" });
  const [leaveRequests, setLeaveRequests] = useState([
    { id:1, type:"Casual Leave", from:"2024-12-22", to:"2024-12-23", reason:"Personal work", status:"approved" },
    { id:2, type:"Sick Leave",   from:"2024-11-15", to:"2024-11-15", reason:"Fever",         status:"approved" },
  ]);
  const [toast, setToast]               = useState(null);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Elapsed timer
  useEffect(() => {
    if (!checkedIn || checkOutTime) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [checkedIn, checkOutTime]);

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setCheckedIn(true);
    setElapsed(0);
    showToast("✅ Checked in successfully!");
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    const secs = elapsed;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const late = checkInTime.getHours() > 9 || (checkInTime.getHours() === 9 && checkInTime.getMinutes() > 5);
    setHistory(prev => ({
      ...prev,
      [todayKey]: {
        status:   late ? "late" : "present",
        checkIn:  fmt12(checkInTime),
        checkOut: fmt12(now),
        hours:    `${h}h ${m}m`,
      },
    }));
    showToast("👋 Checked out successfully!");
  };

  const fmt12 = (d) => {
    let h = d.getHours(), m = d.getMinutes().toString().padStart(2,"0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h.toString().padStart(2,"0")}:${m} ${ampm}`;
  };

  const fmtElapsed = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2,"0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2,"0");
    const sec = (s % 60).toString().padStart(2,"0");
    return `${h}:${m}:${sec}`;
  };

  // Stats
  const thisMonthKeys = Object.keys(history).filter(k => k.startsWith(`${calYear}-${(calMonth+1).toString().padStart(2,"0")}`));
  const allKeys       = Object.keys(history);
  const presentCount  = allKeys.filter(k => ["present","late"].includes(history[k].status)).length;
  const absentCount   = allKeys.filter(k => history[k].status === "absent").length;
  const leaveCount    = allKeys.filter(k => history[k].status === "leave").length;
  const lateCount     = allKeys.filter(k => history[k].status === "late").length;
  const totalWorkDays = allKeys.length;
  const attendancePct = totalWorkDays ? Math.round((presentCount / totalWorkDays) * 100) : 0;

  // Calendar helpers
  const firstDay  = new Date(calYear, calMonth, 1).getDay();
  const daysInMon = new Date(calYear, calMonth + 1, 0).getDate();

  const getDayStatus = (year, month, day) => {
    const key = `${year}-${(month+1).toString().padStart(2,"0")}-${day.toString().padStart(2,"0")}`;
    const d   = new Date(year, month, day);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) return "weekend";
    if (history[key]) return history[key].status;
    if (key === todayKey) return checkedIn ? (history[todayKey]?.status || "present") : null;
    return null;
  };

  const submitLeave = () => {
    if (!leaveForm.from || !leaveForm.to || !leaveForm.reason.trim()) {
      showToast("Please fill all fields", "error"); return;
    }
    setLeaveRequests(prev => [...prev, { id: Date.now(), ...leaveForm, status:"pending" }]);
    setLeaveForm({ type:"Sick Leave", from:"", to:"", reason:"" });
    setLeaveModal(false);
    showToast("📋 Leave request submitted!");
  };

  const inputCls  = "w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-sm";
  const isToday   = (d) => d === todayKey;
  const todayEntry = history[todayKey];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        html,body,#root{margin:0;padding:0;background:#0f172a;min-height:100vh;}
        *{font-family:'Inter',sans-serif;box-sizing:border-box;}
        h1,h2,h3,h4,h5,h6{font-family:'Outfit',sans-serif;}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        .fade-up{animation:fadeInUp .5s ease-out forwards;}
        .fade-in{animation:fadeIn .3s ease-out forwards;}
        .slide-down{animation:slideDown .3s ease-out forwards;}
        .d1{animation-delay:.05s;opacity:0}.d2{animation-delay:.1s;opacity:0}
        .d3{animation-delay:.15s;opacity:0}.d4{animation-delay:.2s;opacity:0}
        .d5{animation-delay:.25s;opacity:0}.d6{animation-delay:.3s;opacity:0}
        .live-dot{animation:pulse 1.5s ease-in-out infinite;}
        .scrollbar::-webkit-scrollbar{width:5px}
        .scrollbar::-webkit-scrollbar-track{background:rgba(255,255,255,.05);border-radius:10px}
        .scrollbar::-webkit-scrollbar-thumb{background:rgba(20,184,166,.4);border-radius:10px}
      `}</style>

      <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl"></div>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`fixed top-6 right-6 z-100 slide-down px-5 py-3 rounded-xl shadow-2xl font-medium text-sm
            ${toast.type === "error" ? "bg-red-500 text-white" : "bg-linear-to-r from-teal-500 to-cyan-600 text-white"}`}>
            {toast.msg}
          </div>
        )}

        <div className="relative z-10 p-8">

          {/* Page Header  */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 fade-up">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Attendance</h1>
              <p className="text-gray-400 text-lg">Track your work hours and attendance records</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Live Clock */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-5 py-3 text-center">
                <p className="text-gray-400 text-xs mb-1">{today.toDateString()}</p>
                <p className="text-white text-2xl font-bold font-mono">
                  {liveTime.toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
                </p>
              </div>
              <button onClick={() => setLeaveModal(true)}
                className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Request Leave
              </button>
            </div>
          </div>

          {/* Check-In Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8 fade-up d1">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Status Orb */}
              <div className="shrink-0">
                <div className={`relative w-36 h-36 rounded-full flex items-center justify-center
                  ${checkedIn && !checkOutTime
                    ? "bg-linear-to-br from-teal-500 to-cyan-600 shadow-2xl shadow-teal-500/40"
                    : checkOutTime
                    ? "bg-linear-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/40"
                    : "bg-linear-to-br from-slate-700 to-slate-600"}`}>
                  {checkedIn && !checkOutTime && (
                    <div className="absolute inset-0 rounded-full bg-teal-400/20 live-dot"></div>
                  )}
                  <div className="text-center">
                    <svg className="w-12 h-12 text-white mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d={checkOutTime
                          ? "M17 16l4-4m0 0l-4-4m4 4H7"
                          : checkedIn
                          ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          : "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"} />
                    </svg>
                    <p className="text-white text-xs font-semibold">
                      {checkOutTime ? "Done" : checkedIn ? "Working" : "Not In"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Check-in Details */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <p className="text-gray-400 text-sm mb-2">Check-In Time</p>
                  <p className="text-white text-2xl font-bold font-mono">{checkInTime ? fmt12(checkInTime) : "--:--"}</p>
                  {checkInTime && (
                    <p className={`text-xs mt-1 ${checkInTime.getHours() > 9 ? "text-yellow-400" : "text-green-400"}`}>
                      {checkInTime.getHours() > 9 ? "Late arrival" : "On time ✓"}
                    </p>
                  )}
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <p className="text-gray-400 text-sm mb-2">{checkedIn && !checkOutTime ? "Time Elapsed" : "Duration"}</p>
                  <p className="text-teal-400 text-2xl font-bold font-mono">
                    {checkedIn ? fmtElapsed(elapsed) : "--:--:--"}
                  </p>
                  {checkedIn && !checkOutTime && (
                    <p className="text-xs text-gray-400 mt-1">Session active</p>
                  )}
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <p className="text-gray-400 text-sm mb-2">Check-Out Time</p>
                  <p className="text-white text-2xl font-bold font-mono">{checkOutTime ? fmt12(checkOutTime) : "--:--"}</p>
                  {checkOutTime && <p className="text-xs text-blue-400 mt-1">Session complete</p>}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                {!checkedIn ? (
                  <button onClick={handleCheckIn}
                    className="px-10 py-5 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-teal-500/40 hover:-translate-y-1 transition-all">
                    Check In
                  </button>
                ) : !checkOutTime ? (
                  <button onClick={handleCheckOut}
                    className="px-10 py-5 bg-linear-to-r from-red-500 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-1 transition-all">
                    Check Out
                  </button>
                ) : (
                  <div className="px-10 py-5 bg-white/5 border border-white/10 text-gray-400 rounded-2xl font-bold text-lg text-center">
                    Day Complete ✓
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards  */}
          <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
            {[
              { label:"Attendance",   value:`${attendancePct}%`, color:"from-teal-400 to-cyan-600",    icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", cls:"d1" },
              { label:"Present Days", value:presentCount,        color:"from-green-400 to-emerald-600", icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", cls:"d2" },
              { label:"Late Days",    value:lateCount,           color:"from-yellow-400 to-orange-500", icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", cls:"d3" },
              { label:"Absent Days",  value:absentCount,         color:"from-red-400 to-pink-600",      icon:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", cls:"d4" },
              { label:"On Leave",     value:leaveCount,          color:"from-blue-400 to-indigo-600",   icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", cls:"d5" },
            ].map(s => (
              <div key={s.label} className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition-all fade-up ${s.cls}`}>
                <div className={`w-12 h-12 bg-linear-to-br ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs mb-1">{s.label}</p>
                <p className="text-white text-3xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs  */}
          <div className="flex gap-2 mb-6 bg-white/5 border border-white/10 rounded-2xl p-1.5 w-fit fade-up d5">
            {[["overview","Overview"],["calendar","Calendar"],["history","History"],["leaves","Leave Requests"]].map(([id,label]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab===id ? "bg-linear-to-r from-teal-500 to-cyan-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB  */}
          {tab === "overview" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 fade-in">
              {/* Weekly bar chart */}
              <div className="xl:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">This Week's Hours</h2>
                <div className="flex items-end justify-between gap-3 h-48">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => {
                    const h = i < 5 ? 6 + Math.floor(Math.random() * 3) : 0;
                    const pct = (h / 10) * 100;
                    return (
                      <div key={d} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-gray-400 text-xs">{h > 0 ? `${h}h` : "-"}</span>
                        <div className="w-full bg-white/10 rounded-t-lg overflow-hidden flex flex-col-reverse" style={{height:"160px"}}>
                          <div className="w-full bg-linear-to-t from-teal-500 to-cyan-400 rounded-t-lg transition-all hover:from-teal-400 hover:to-cyan-300"
                            style={{height:`${pct}%`}} />
                        </div>
                        <span className="text-gray-400 text-xs">{d}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>Hours Worked
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-3 h-3 bg-white/10 rounded-full"></div>Target (8h)
                  </div>
                </div>
              </div>

              {/* Today's summary */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Today's Summary</h2>
                <div className="space-y-4">
                  {[
                    { label:"Status",      value: checkedIn ? (checkOutTime ? "Completed" : "Active") : "Not Checked In",
                      color: checkedIn ? (checkOutTime ? "text-blue-400" : "text-green-400") : "text-gray-400" },
                    { label:"Check In",    value: checkInTime  ? fmt12(checkInTime)  : "--", color:"text-white" },
                    { label:"Check Out",   value: checkOutTime ? fmt12(checkOutTime) : "--", color:"text-white" },
                    { label:"Hours Worked",value: checkedIn ? fmtElapsed(elapsed) : "0h 0m 0s", color:"text-teal-400" },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className={`font-bold text-sm ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Attendance ring */}
                <div className="mt-6 text-center">
                  <div className="inline-flex flex-col items-center justify-center w-28 h-28 bg-linear-to-br from-teal-500 to-cyan-600 rounded-full shadow-lg shadow-teal-500/30">
                    <p className="text-white text-2xl font-bold">{attendancePct}%</p>
                    <p className="text-white/80 text-xs">Rate</p>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">Overall Attendance Rate</p>
                </div>
              </div>
            </div>
          )}

          {/* CALENDAR TAB  */}
          {tab === "calendar" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 fade-in">
              <div className="xl:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                {/* Month nav */}
                <div className="flex items-center justify-between mb-6">
                  <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); } else setCalMonth(m => m-1); }}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold text-white">{MONTH_NAMES[calMonth]} {calYear}</h2>
                  <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); } else setCalMonth(m => m+1); }}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAY_NAMES.map(d => (
                    <div key={d} className="text-center text-gray-400 text-xs font-semibold py-2">{d}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMon }, (_, i) => i + 1).map(day => {
                    const status = getDayStatus(calYear, calMonth, day);
                    const key    = `${calYear}-${(calMonth+1).toString().padStart(2,"0")}-${day.toString().padStart(2,"0")}`;
                    const isTod  = key === todayKey;
                    const cfg    = status ? statusCfg[status] : null;
                    return (
                      <button key={day}
                        onClick={() => setSelectedDay({ day, key, status, entry: history[key] })}
                        className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all hover:scale-105
                          ${isTod ? "ring-2 ring-teal-400" : ""}
                          ${cfg ? `${cfg.bg} ${cfg.text}` : "bg-white/5 text-gray-400"}
                          ${selectedDay?.day === day ? "ring-2 ring-white/50" : ""}`}>
                        {day}
                        {cfg && <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-white/10">
                  {Object.entries(statusCfg).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${v.dot}`} />
                      <span className="text-gray-400 text-xs">{v.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day detail */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Day Details</h2>
                {selectedDay ? (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <p className="text-gray-400 text-sm">{selectedDay.key}</p>
                      <div className={`inline-block mt-2 px-4 py-2 rounded-xl text-sm font-semibold
                        ${selectedDay.status ? `${statusCfg[selectedDay.status].bg} ${statusCfg[selectedDay.status].text}` : "bg-white/10 text-gray-400"}`}>
                        {selectedDay.status ? statusCfg[selectedDay.status].label : "No Data"}
                      </div>
                    </div>
                    {selectedDay.entry && (
                      <div className="space-y-3">
                        {[
                          { label:"Check In",  value:selectedDay.entry.checkIn  },
                          { label:"Check Out", value:selectedDay.entry.checkOut },
                          { label:"Hours",     value:selectedDay.entry.hours    },
                        ].map(item => (
                          <div key={item.label} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-gray-400 text-sm">{item.label}</span>
                            <span className="text-white font-bold text-sm">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {!selectedDay.entry && (
                      <p className="text-center text-gray-500 py-8">No attendance record for this day</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-400">Click a day to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HISTORY TAB  */}
          {tab === "history" && (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Attendance History</h2>
                <span className="text-gray-400 text-sm">{Object.keys(history).length} records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Date","Day","Status","Check In","Check Out","Hours"].map(h => (
                        <th key={h} className="text-left text-gray-400 text-sm font-semibold pb-4 pr-6">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {Object.entries(history).sort(([a],[b]) => b.localeCompare(a)).map(([date, entry]) => {
                      const d   = new Date(date);
                      const cfg = statusCfg[entry.status];
                      return (
                        <tr key={date} className="hover:bg-white/5 transition-all">
                          <td className="py-4 pr-6 text-white font-medium">{date}</td>
                          <td className="py-4 pr-6 text-gray-400">{DAY_NAMES[d.getDay()]}</td>
                          <td className="py-4 pr-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                              {cfg.label}
                            </span>
                          </td>
                          <td className="py-4 pr-6 text-gray-300 font-mono text-sm">{entry.checkIn}</td>
                          <td className="py-4 pr-6 text-gray-300 font-mono text-sm">{entry.checkOut}</td>
                          <td className="py-4 pr-6 text-teal-400 font-semibold">{entry.hours}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/*  LEAVES TAB */}
          {tab === "leaves" && (
            <div className="fade-in space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Leave Requests</h2>
                <button onClick={() => setLeaveModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Request
                </button>
              </div>

              {leaveRequests.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-400 text-xl">No leave requests yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {leaveRequests.map(lr => (
                    <div key={lr.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white font-bold">{lr.type}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold
                          ${lr.status==="approved" ? "bg-green-500/20 text-green-400" :
                            lr.status==="rejected" ? "bg-red-500/20 text-red-400" :
                            "bg-yellow-500/20 text-yellow-400"}`}>
                          {lr.status.charAt(0).toUpperCase() + lr.status.slice(1)}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">From</span>
                          <span className="text-white">{lr.from}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">To</span>
                          <span className="text-white">{lr.to}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Reason</span>
                          <span className="text-white text-right max-w-[60%]">{lr.reason}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 
            LEAVE REQUEST MODAL
             */}
        {leaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLeaveModal(false)} />
            <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Request Leave</h2>
                <button onClick={() => setLeaveModal(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Leave Type</label>
                  <select value={leaveForm.type} onChange={e => setLeaveForm({...leaveForm, type:e.target.value})} className={inputCls}>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Annual Leave</option>
                    <option>Emergency Leave</option>
                    <option>Maternity/Paternity Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 text-sm font-medium mb-2 block">From Date</label>
                    <input type="date" value={leaveForm.from} onChange={e => setLeaveForm({...leaveForm, from:e.target.value})} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-medium mb-2 block">To Date</label>
                    <input type="date" value={leaveForm.to} onChange={e => setLeaveForm({...leaveForm, to:e.target.value})} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Reason</label>
                  <textarea value={leaveForm.reason} onChange={e => setLeaveForm({...leaveForm, reason:e.target.value})}
                    placeholder="Briefly explain the reason for leave..." rows={3}
                    className={inputCls + " resize-none"} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setLeaveModal(false)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                  Cancel
                </button>
                <button onClick={submitLeave}
                  className="flex-1 py-3 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
