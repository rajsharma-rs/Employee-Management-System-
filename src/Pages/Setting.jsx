import React from 'react'
import { useState } from "react";

export default function SettingsPage() {
  // ── State ──
  const [activeSection, setActiveSection] = useState("general");
  const [toast, setToast] = useState(null);
  const [saved, setSaved] = useState({});

  // General Settings
  const [general, setGeneral] = useState({
    language: "English (US)",
    timezone: "UTC-5 (Eastern Time)",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12-hour",
    currency: "USD ($)",
    theme: "dark",
  });

  // Notification Settings
  const [notifs, setNotifs] = useState({
    emailTaskAssign:   true,
    emailTaskComplete: false,
    emailLeaveUpdate:  true,
    emailReports:      false,
    emailAnnounce:     true,
    browserTasks:      true,
    browserMessages:   true,
    browserAlerts:     false,
    weeklyDigest:      true,
    monthlyReport:     false,
    reminderBefore:    "30",
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisible:   "everyone",
    showEmail:        true,
    showPhone:        false,
    showAttendance:   true,
    showTasks:        "team",
    activityStatus:   true,
    dataSharing:      false,
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme:          "dark",
    accentColor:    "teal",
    fontSize:       "medium",
    density:        "comfortable",
    sidebarCollapsed: false,
    animationsOn:   true,
    highContrast:   false,
  });

  // Password
  const [pw, setPw]       = useState({ current: "", next: "", confirm: "" });
  const [pwErr, setPwErr] = useState("");
  const [pwShow, setPwShow] = useState({ current: false, next: false, confirm: false });

  // 2FA
  const [twoFA, setTwoFA]   = useState(false);
  const [sessions] = useState([
    { id: 1, device: "Chrome on Windows", location: "New York, USA",   time: "Active now",    current: true  },
    { id: 2, device: "Safari on iPhone",  location: "New York, USA",   time: "2 hours ago",   current: false },
    { id: 3, device: "Firefox on Mac",    location: "Boston, USA",     time: "Yesterday",     current: false },
  ]);

  // Connected apps
  const [apps, setApps] = useState([
    { id: 1, name: "Google Calendar", icon: "📅", connected: true,  desc: "Sync tasks and meetings" },
    { id: 2, name: "Slack",           icon: "💬", connected: true,  desc: "Get notifications in Slack" },
    { id: 3, name: "GitHub",          icon: "🐙", connected: false, desc: "Link your repositories" },
    { id: 4, name: "Zoom",            icon: "🎥", connected: false, desc: "Join meetings directly" },
    { id: 5, name: "Trello",          icon: "📋", connected: false, desc: "Sync your boards" },
    { id: 6, name: "Notion",          icon: "📝", connected: false, desc: "Share notes and docs" },
  ]);

  // Accessibility
  const [access, setAccess] = useState({
    reducedMotion:   false,
    highContrast:    false,
    largeText:       false,
    screenReader:    false,
    keyboardNav:     true,
    focusIndicators: true,
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (section) => {
    setSaved(s => ({ ...s, [section]: true }));
    showToast(`✅ ${section.charAt(0).toUpperCase() + section.slice(1)} settings saved!`);
    setTimeout(() => setSaved(s => ({ ...s, [section]: false })), 2000);
  };

  const changePassword = () => {
    setPwErr("");
    if (!pw.current)           { setPwErr("Enter your current password"); return; }
    if (pw.next.length < 6)    { setPwErr("New password must be at least 6 characters"); return; }
    if (pw.next !== pw.confirm){ setPwErr("Passwords do not match"); return; }
    setPw({ current: "", next: "", confirm: "" });
    showToast("🔒 Password changed successfully!");
  };

  const toggleApp = (id) => {
    setApps(a => a.map(app =>
      app.id === id ? { ...app, connected: !app.connected } : app
    ));
    const app = apps.find(a => a.id === id);
    showToast(app.connected ? `Disconnected from ${app.name}` : `✅ Connected to ${app.name}`);
  };

  const accentColors = [
    { name: "teal",   class: "bg-teal-500"   },
    { name: "blue",   class: "bg-blue-500"   },
    { name: "purple", class: "bg-purple-500" },
    { name: "pink",   class: "bg-pink-500"   },
    { name: "orange", class: "bg-orange-500" },
    { name: "green",  class: "bg-green-500"  },
  ];

  const navItems = [
    { id: "general",      label: "General",        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { id: "notifications",label: "Notifications",  icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { id: "appearance",   label: "Appearance",     icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
    { id: "privacy",      label: "Privacy",        icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
    { id: "security",     label: "Security",       icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { id: "integrations", label: "Integrations",   icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
    { id: "accessibility",label: "Accessibility",  icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { id: "danger",       label: "Danger Zone",    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", danger: true },
  ];

  const inputCls   = "w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-sm";
  const selectCls  = inputCls + " cursor-pointer";
  const SectionTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
      <div className="w-1.5 h-7 bg-linear-to-b from-teal-500 to-cyan-600 rounded-full"></div>
      {children}
    </h2>
  );
  const Toggle = ({ checked, onChange }) => (
    <button onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${checked ? "bg-linear-to-r from-teal-500 to-cyan-600" : "bg-white/10"}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${checked ? "left-7" : "left-1"}`} />
    </button>
  );
  const Row = ({ label, sub, children }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/8 transition-all gap-4">
      <div className="min-w-0">
        <p className="text-white font-medium text-sm">{label}</p>
        {sub && <p className="text-gray-400 text-xs mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  );
  const SaveBtn = ({ section }) => (
    <div className="flex justify-end mt-6">
      <button onClick={() => handleSave(section)}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-sm
          ${saved[section]
            ? "bg-green-500 text-white"
            : "bg-linear-to-r from-teal-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"}`}>
        {saved[section]
          ? <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Saved!</>
          : "Save Changes"}
      </button>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        html,body,#root{margin:0;padding:0;background:#0f172a;min-height:100vh;}
        *{font-family:'Inter',sans-serif;box-sizing:border-box;}
        h1,h2,h3,h4{font-family:'Outfit',sans-serif;}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .fade-up{animation:fadeInUp .5s ease-out forwards;}
        .fade-in{animation:fadeIn .25s ease-out forwards;}
        .slide-down{animation:slideDown .3s ease-out forwards;}
        .float{animation:float 4s ease-in-out infinite;}
        .scrollbar::-webkit-scrollbar{width:5px}
        .scrollbar::-webkit-scrollbar-track{background:rgba(255,255,255,.04);border-radius:10px}
        .scrollbar::-webkit-scrollbar-thumb{background:rgba(20,184,166,.4);border-radius:10px}
        .scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(20,184,166,.65)}
      `}</style>

      <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -left-16 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl float" style={{animationDelay:"2s"}}></div>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`fixed top-6 right-6 z-100 slide-down px-5 py-3 rounded-xl shadow-2xl font-medium text-sm
            ${toast.type==="error" ? "bg-red-500 text-white" : "bg-linear-to-r from-teal-500 to-cyan-600 text-white"}`}>
            {toast.msg}
          </div>
        )}

        <div className="relative z-10 p-8 max-w-350 mx-auto">
          {/* ── Page Header ── */}
          <div className="mb-8 fade-up">
            <h1 className="text-5xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400 text-lg">Manage your preferences and account configurations</p>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* ── Left Nav ── */}
            <aside className="xl:w-72 shrink-0">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 sticky top-8">
                <nav className="space-y-1">
                  {navItems.map(item => (
                    <button key={item.id} onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
                        ${activeSection === item.id
                          ? item.danger
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-linear-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border border-teal-500/30"
                          : item.danger
                            ? "text-red-400 hover:bg-red-500/10"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.label}
                      {activeSection === item.id && !item.danger && (
                        <div className="ml-auto w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ── Right Content ── */}
            <main className="flex-1 min-w-0">

              {/* ════ GENERAL ════ */}
              {activeSection === "general" && (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 fade-in">
                  <SectionTitle>General Settings</SectionTitle>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Language</label>
                        <select value={general.language} onChange={e => setGeneral(g=>({...g,language:e.target.value}))} className={selectCls}>
                          {["English (US)","English (UK)","Hindi","Spanish","French","German","Arabic","Japanese"].map(l=><option key={l}>{l}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Timezone</label>
                        <select value={general.timezone} onChange={e => setGeneral(g=>({...g,timezone:e.target.value}))} className={selectCls}>
                          {["UTC-8 (PST)","UTC-5 (Eastern Time)","UTC+0 (GMT)","UTC+1 (CET)","UTC+5:30 (IST)","UTC+8 (SGT)","UTC+9 (JST)"].map(t=><option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Date Format</label>
                        <select value={general.dateFormat} onChange={e => setGeneral(g=>({...g,dateFormat:e.target.value}))} className={selectCls}>
                          {["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD","DD MMM YYYY"].map(f=><option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Time Format</label>
                        <select value={general.timeFormat} onChange={e => setGeneral(g=>({...g,timeFormat:e.target.value}))} className={selectCls}>
                          <option>12-hour</option>
                          <option>24-hour</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Currency</label>
                        <select value={general.currency} onChange={e => setGeneral(g=>({...g,currency:e.target.value}))} className={selectCls}>
                          {["USD ($)","EUR (€)","GBP (£)","INR (₹)","JPY (¥)","AED (د.إ)"].map(c=><option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-white font-medium mb-3">Working Hours</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-xs mb-1 block">Start Time</label>
                          <input type="time" defaultValue="09:00" className={inputCls} />
                        </div>
                        <div>
                          <label className="text-gray-400 text-xs mb-1 block">End Time</label>
                          <input type="time" defaultValue="18:00" className={inputCls} />
                        </div>
                      </div>
                    </div>
                    <SaveBtn section="general" />
                  </div>
                </div>
              )}

              {/* ════ NOTIFICATIONS ════ */}
              {activeSection === "notifications" && (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 fade-in">
                  <SectionTitle>Notification Preferences</SectionTitle>
                  <div className="space-y-8">
                    {/* Email */}
                    <div>
                      <p className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-4">Email Notifications</p>
                      <div className="space-y-3">
                        {[
                          { key:"emailTaskAssign",   label:"Task Assigned",         sub:"When a new task is assigned to you"          },
                          { key:"emailTaskComplete", label:"Task Completed",         sub:"When your assigned task is marked done"      },
                          { key:"emailLeaveUpdate",  label:"Leave Status Updates",   sub:"When your leave request is approved/rejected"},
                          { key:"emailReports",      label:"Monthly Reports",        sub:"Receive monthly performance summaries"       },
                          { key:"emailAnnounce",     label:"Company Announcements",  sub:"Important company-wide updates"              },
                        ].map(n => (
                          <Row key={n.key} label={n.label} sub={n.sub}>
                            <Toggle checked={notifs[n.key]} onChange={() => setNotifs(p=>({...p,[n.key]:!p[n.key]}))} />
                          </Row>
                        ))}
                      </div>
                    </div>

                    {/* Browser */}
                    <div>
                      <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Browser Notifications</p>
                      <div className="space-y-3">
                        {[
                          { key:"browserTasks",    label:"Task Reminders",   sub:"Get reminded before task deadlines" },
                          { key:"browserMessages", label:"Messages",         sub:"Instant notifications for messages" },
                          { key:"browserAlerts",   label:"System Alerts",    sub:"Critical system notifications"     },
                        ].map(n => (
                          <Row key={n.key} label={n.label} sub={n.sub}>
                            <Toggle checked={notifs[n.key]} onChange={() => setNotifs(p=>({...p,[n.key]:!p[n.key]}))} />
                          </Row>
                        ))}
                      </div>
                    </div>

                    {/* Digest */}
                    <div>
                      <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-4">Digest & Summary</p>
                      <div className="space-y-3">
                        {[
                          { key:"weeklyDigest",  label:"Weekly Digest",     sub:"Summary every Monday morning"      },
                          { key:"monthlyReport", label:"Monthly Report",    sub:"Performance report at month end"   },
                        ].map(n => (
                          <Row key={n.key} label={n.label} sub={n.sub}>
                            <Toggle checked={notifs[n.key]} onChange={() => setNotifs(p=>({...p,[n.key]:!p[n.key]}))} />
                          </Row>
                        ))}
                        <Row label="Reminder Before Deadline" sub="Get reminded before a task is due">
                          <select value={notifs.reminderBefore}
                            onChange={e => setNotifs(p=>({...p,reminderBefore:e.target.value}))}
                            className="bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50">
                            {["15","30","60","120","1440"].map(m=>(
                              <option key={m} value={m}>{m==="1440" ? "1 day" : `${m} min`}</option>
                            ))}
                          </select>
                        </Row>
                      </div>
                    </div>
                    <SaveBtn section="notifications" />
                  </div>
                </div>
              )}

              {/* ════ APPEARANCE ════ */}
              {activeSection === "appearance" && (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 fade-in">
                  <SectionTitle>Appearance</SectionTitle>
                  <div className="space-y-8">
                    {/* Theme */}
                    <div>
                      <p className="text-gray-300 font-medium mb-3">Theme</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { val:"dark",   label:"Dark",   preview:"bg-slate-900 border-slate-700" },
                          { val:"light",  label:"Light",  preview:"bg-gray-100 border-gray-300"   },
                          { val:"system", label:"System", preview:"bg-gradient-to-r from-slate-900 to-gray-100 border-gray-400" },
                        ].map(t => (
                          <button key={t.val} onClick={() => setAppearance(a=>({...a,theme:t.val}))}
                            className={`p-4 rounded-xl border-2 transition-all ${appearance.theme===t.val ? "border-teal-500 bg-teal-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
                            <div className={`h-16 rounded-lg mb-3 border ${t.preview}`}></div>
                            <p className="text-white text-sm font-medium">{t.label}</p>
                            {appearance.theme===t.val && <div className="w-2 h-2 bg-teal-400 rounded-full mx-auto mt-2"></div>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <p className="text-gray-300 font-medium mb-3">Accent Color</p>
                      <div className="flex gap-3 flex-wrap">
                        {[
                          {name:"teal",   cls:"bg-teal-500"},
                          {name:"blue",   cls:"bg-blue-500"},
                          {name:"purple", cls:"bg-purple-500"},
                          {name:"pink",   cls:"bg-pink-500"},
                          {name:"orange", cls:"bg-orange-500"},
                          {name:"green",  cls:"bg-green-500"},
                        ].map(c => (
                          <button key={c.name} onClick={() => setAppearance(a=>({...a,accentColor:c.name}))}
                            className={`w-10 h-10 rounded-xl ${c.cls} hover:scale-110 transition-all
                              ${appearance.accentColor===c.name ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900" : ""}`} />
                        ))}
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <p className="text-gray-300 font-medium mb-3">Font Size</p>
                      <div className="flex gap-3">
                        {["small","medium","large"].map(s => (
                          <button key={s} onClick={() => setAppearance(a=>({...a,fontSize:s}))}
                            className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-all
                              ${appearance.fontSize===s ? "bg-linear-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/50 text-teal-300" : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Density */}
                    <div>
                      <p className="text-gray-300 font-medium mb-3">Display Density</p>
                      <div className="flex gap-3">
                        {["compact","comfortable","spacious"].map(d => (
                          <button key={d} onClick={() => setAppearance(a=>({...a,density:d}))}
                            className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-all
                              ${appearance.density===d ? "bg-linear-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/50 text-teal-300" : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="space-y-3">
                      {[
                        { key:"sidebarCollapsed", label:"Collapsed Sidebar",  sub:"Show only icons by default"        },
                        { key:"animationsOn",     label:"Enable Animations",  sub:"Smooth transitions and effects"     },
                        { key:"highContrast",     label:"High Contrast Mode", sub:"Increase contrast for readability"  },
                      ].map(item => (
                        <Row key={item.key} label={item.label} sub={item.sub}>
                          <Toggle checked={appearance[item.key]} onChange={() => setAppearance(a=>({...a,[item.key]:!a[item.key]}))} />
                        </Row>
                      ))}
                    </div>
                    <SaveBtn section="appearance" />
                  </div>
                </div>
              )}

              {/* ════ PRIVACY ════ */}
              {activeSection === "privacy" && (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 fade-in">
                  <SectionTitle>Privacy Settings</SectionTitle>
                  <div className="space-y-6">
                    <Row label="Profile Visibility" sub="Who can view your profile">
                      <select value={privacy.profileVisible} onChange={e=>setPrivacy(p=>({...p,profileVisible:e.target.value}))}
                        className="bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50">
                        <option value="everyone">Everyone</option>
                        <option value="team">My Team</option>
                        <option value="managers">Managers Only</option>
                      </select>
                    </Row>
                    <Row label="Task Visibility" sub="Who can see your tasks">
                      <select value={privacy.showTasks} onChange={e=>setPrivacy(p=>({...p,showTasks:e.target.value}))}
                        className="bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50">
                        <option value="everyone">Everyone</option>
                        <option value="team">My Team</option>
                        <option value="private">Only Me</option>
                      </select>
                    </Row>
                    {[
                      { key:"showEmail",      label:"Show Email Address",    sub:"Visible to other employees"         },
                      { key:"showPhone",      label:"Show Phone Number",     sub:"Visible on your profile"            },
                      { key:"showAttendance", label:"Show Attendance Record",sub:"Visible to managers"                },
                      { key:"activityStatus", label:"Show Activity Status",  sub:"Let others see when you're online"  },
                      { key:"dataSharing",    label:"Allow Data Analytics",  sub:"Help improve the platform"          },
                    ].map(item => (
                      <Row key={item.key} label={item.label} sub={item.sub}>
                        <Toggle checked={privacy[item.key]} onChange={() => setPrivacy(p=>({...p,[item.key]:!p[item.key]}))} />
                      </Row>
                    ))}
                    <SaveBtn section="privacy" />
                  </div>
                </div>
              )}

              {/* ════ SECURITY ════ */}
              {activeSection === "security" && (
                <div className="space-y-6 fade-in">
                  {/* Change Password */}
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    <SectionTitle>Change Password</SectionTitle>
                    <div className="space-y-4 max-w-md">
                      {[
                        { label:"Current Password", key:"current" },
                        { label:"New Password",      key:"next"    },
                        { label:"Confirm Password",  key:"confirm" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-gray-300 text-sm font-medium mb-2 block">{f.label}</label>
                          <div className="relative">
                            <input type={pwShow[f.key] ? "text" : "password"} value={pw[f.key]}
                              onChange={e => { setPwErr(""); setPw(p=>({...p,[f.key]:e.target.value})); }}
                              placeholder="••••••••" className={inputCls + " pr-12"} />
                            <button type="button" onClick={() => setPwShow(s=>({...s,[f.key]:!s[f.key]}))}
                              className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d={pwShow[f.key]
                                    ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                    : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                      {/* Password strength */}
                      {pw.next && (
                        <div>
                          <div className="flex gap-1 mb-1">
                            {[1,2,3,4].map(i => (
                              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${
                                pw.next.length >= i * 3
                                  ? pw.next.length >= 12 ? "bg-green-400"
                                    : pw.next.length >= 8 ? "bg-yellow-400"
                                    : "bg-red-400"
                                  : "bg-white/10"}`} />
                            ))}
                          </div>
                          <p className={`text-xs ${pw.next.length >= 12 ? "text-green-400" : pw.next.length >= 8 ? "text-yellow-400" : "text-red-400"}`}>
                            {pw.next.length >= 12 ? "Strong password" : pw.next.length >= 8 ? "Medium strength" : "Weak password"}
                          </p>
                        </div>
                      )}
                      {pwErr && <p className="text-red-400 text-sm">{pwErr}</p>}
                      <button onClick={changePassword}
                        className="w-full py-3 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* 2FA */}
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    <SectionTitle>Two-Factor Authentication</SectionTitle>
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm mb-2">Add an extra layer of security to your account. When enabled, you'll need your password plus a verification code to sign in.</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${twoFA ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          <div className={`w-2 h-2 rounded-full ${twoFA ? "bg-green-400" : "bg-red-400"}`}></div>
                          {twoFA ? "Enabled" : "Disabled"}
                        </div>
                      </div>
                      <button onClick={() => { setTwoFA(t => !t); showToast(twoFA ? "2FA disabled" : "✅ 2FA enabled!"); }}
                        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all shrink-0
                          ${twoFA ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" : "bg-linear-to-r from-teal-500 to-cyan-600 text-white hover:shadow-lg"}`}>
                        {twoFA ? "Disable 2FA" : "Enable 2FA"}
                      </button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    <SectionTitle>Active Sessions</SectionTitle>
                    <div className="space-y-3">
                      {sessions.map(s => (
                        <div key={s.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{s.device}</p>
                              <p className="text-gray-400 text-xs">{s.location} · {s.time}</p>
                            </div>
                          </div>
                          {s.current
                            ? <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-3 py-1 rounded-full">Current</span>
                            : <button onClick={() => showToast("Session terminated")}
                                className="text-xs font-semibold text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1 rounded-full hover:bg-red-500/10 transition-all">
                                Revoke
                              </button>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════ INTEGRATIONS ════ */}
              {activeSection === "integrations" && (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 fade-in">
                  <SectionTitle>Connected Integrations</SectionTitle>
                  <p className="text-gray-400 text-sm mb-6">Connect your favourite tools to enhance your workflow.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {apps.map(app => (
                      <div key={app.id} className={`flex items-center justify-between p-5 rounded-2xl border transition-all
                        ${app.connected ? "bg-teal-500/5 border-teal-500/30" : "bg-white/5 border-white/10 hover:border-white/20"}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">{app.icon}</div>
                          <div>
                            <p className="text-white font-semibold">{app.name}</p>
                            <p className="text-gray-400 text-xs">{app.desc}</p>
                          </div>
                        </div>
                        <button onClick={() => toggleApp(app.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ml-4
                            ${app.connected ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" : "bg-linear-to-r from-teal-500 to-cyan-600 text-white hover:shadow-lg"}`}>
                          {app.connected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ════ ACCESSIBILITY ════ */}
              {activeSection === "accessibility" && (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 fade-in">
                  <SectionTitle>Accessibility</SectionTitle>
                  <div className="space-y-4">
                    {[
                      { key:"reducedMotion",   label:"Reduce Motion",        sub:"Minimize animations and transitions" },
                      { key:"highContrast",    label:"High Contrast",         sub:"Increase contrast for better visibility" },
                      { key:"largeText",       label:"Large Text Mode",       sub:"Increase base font size across the app" },
                      { key:"screenReader",    label:"Screen Reader Mode",    sub:"Optimise layout for screen readers" },
                      { key:"keyboardNav",     label:"Keyboard Navigation",   sub:"Enhanced keyboard shortcuts and focus" },
                      { key:"focusIndicators", label:"Focus Indicators",      sub:"Show visible focus rings on elements" },
                    ].map(item => (
                      <Row key={item.key} label={item.label} sub={item.sub}>
                        <Toggle checked={access[item.key]} onChange={() => setAccess(a=>({...a,[item.key]:!a[item.key]}))} />
                      </Row>
                    ))}
                    <SaveBtn section="accessibility" />
                  </div>
                </div>
              )}

              {/* ════ DANGER ZONE ════ */}
              {activeSection === "danger" && (
                <div className="space-y-6 fade-in">
                  <div className="bg-red-500/5 backdrop-blur-lg border border-red-500/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-red-400 mb-2 flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Danger Zone
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">These actions are irreversible. Please proceed with caution.</p>
                    <div className="space-y-4">
                      {[
                        { title:"Export My Data",         sub:"Download all your personal data as a ZIP file",       btn:"Export",    btnCls:"bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30",   action:()=>showToast("📦 Data export started!")         },
                        { title:"Deactivate Account",     sub:"Temporarily disable your account. You can reactivate anytime.", btn:"Deactivate", btnCls:"bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30", action:()=>showToast("Account deactivated","error") },
                        { title:"Clear All Notifications",sub:"Permanently delete all your notifications",            btn:"Clear All", btnCls:"bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30", action:()=>showToast("All notifications cleared") },
                        { title:"Delete Account",         sub:"Permanently delete your account and all associated data. This cannot be undone.", btn:"Delete Account", btnCls:"bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30", action:()=>showToast("⚠️ This action is permanent","error") },
                      ].map(item => (
                        <div key={item.title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white/5 rounded-xl border border-red-500/10">
                          <div>
                            <p className="text-white font-semibold">{item.title}</p>
                            <p className="text-gray-400 text-sm mt-0.5">{item.sub}</p>
                          </div>
                          <button onClick={item.action}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 ${item.btnCls}`}>
                            {item.btn}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>
      </div>
    </>
  );
}

