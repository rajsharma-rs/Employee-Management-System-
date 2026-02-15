import React from "react";
import { useState, useRef } from "react";

const INITIAL_PROFILE = {
  firstName:   "John",
  lastName:    "Doe",
  email:       "john.doe@company.com",
  phone:       "+1 (555) 234-5678",
  department:  "Engineering",
  role:        "Software Developer",
  employeeId:  "EMP-00124",
  joinDate:    "2022-03-15",
  location:    "New York, USA",
  manager:     "Alex Smith",
  bio:         "Passionate software developer with 4+ years of experience in building scalable web applications. Love clean code, great UX, and strong coffee.",
  skills:      ["React.js", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "Docker"],
  social: {
    linkedin: "linkedin.com/in/johndoe",
    github:   "github.com/johndoe",
    twitter:  "@johndoe",
  },
};

const ACTIVITY = [
  { id:1, icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",  color:"from-green-400 to-emerald-600", text:'Completed task "Q4 Sales Report"',              time:"2 hours ago"  },
  { id:2, icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",    color:"from-teal-400 to-cyan-600",    text:"Checked in at 9:02 AM",                         time:"Today"        },
  { id:3, icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color:"from-blue-400 to-indigo-600", text:"Leave request approved",    time:"Yesterday"    },
  { id:4, icon:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", color:"from-purple-400 to-pink-600", text:"Profile information updated", time:"3 days ago" },
  { id:5, icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color:"from-yellow-400 to-orange-500", text:'New task assigned: "Code Review"', time:"4 days ago" },
];

const STATS = [
  { label:"Tasks Done",    value:"47",   color:"from-teal-400 to-cyan-600"    },
  { label:"Attendance",    value:"96%",  color:"from-green-400 to-emerald-600" },
  { label:"Projects",      value:"8",    color:"from-blue-400 to-indigo-600"   },
  { label:"Team Members",  value:"12",   color:"from-purple-400 to-pink-600"   },
];

export default function ProfilePage() {
  const [profile, setProfile]       = useState(INITIAL_PROFILE);
  const [editMode, setEditMode]     = useState(false);
  const [draft, setDraft]           = useState(INITIAL_PROFILE);
  const [tab, setTab]               = useState("overview");
  const [newSkill, setNewSkill]     = useState("");
  const [avatarBg, setAvatarBg]     = useState("from-teal-400 to-cyan-600");
  const [toast, setToast]           = useState(null);
  const [pwForm, setPwForm]         = useState({ current:"", next:"", confirm:"" });
  const [pwError, setPwError]       = useState("");
  const [notifs, setNotifs]         = useState({
    emailTasks:    true,
    emailLeave:    true,
    emailReports:  false,
    browserAlerts: true,
    weeklyDigest:  false,
  });
  const fileRef = useRef();

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveProfile = () => {
    if (!draft.firstName.trim() || !draft.email.trim()) {
      showToast("Name and email are required", "error"); return;
    }
    setProfile(draft);
    setEditMode(false);
    showToast("✅ Profile updated successfully!");
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditMode(false);
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (!s || draft.skills.includes(s)) return;
    setDraft(d => ({ ...d, skills: [...d.skills, s] }));
    setNewSkill("");
  };

  const removeSkill = (sk) => setDraft(d => ({ ...d, skills: d.skills.filter(x => x !== sk) }));

  const changePassword = () => {
    setPwError("");
    if (!pwForm.current) { setPwError("Enter current password"); return; }
    if (pwForm.next.length < 6) { setPwError("New password must be 6+ characters"); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError("Passwords don't match"); return; }
    setPwForm({ current:"", next:"", confirm:"" });
    showToast("🔒 Password changed successfully!");
  };

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;
  const inputCls = "w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-sm";

  const bgOptions = [
    "from-teal-400 to-cyan-600",
    "from-purple-400 to-pink-600",
    "from-blue-400 to-indigo-600",
    "from-orange-400 to-red-500",
    "from-green-400 to-emerald-600",
    "from-yellow-400 to-orange-500",
  ];

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
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .fade-up{animation:fadeInUp .5s ease-out forwards;}
        .fade-in{animation:fadeIn .3s ease-out forwards;}
        .slide-down{animation:slideDown .3s ease-out forwards;}
        .float{animation:float 4s ease-in-out infinite;}
        .d1{animation-delay:.05s;opacity:0}.d2{animation-delay:.1s;opacity:0}
        .d3{animation-delay:.15s;opacity:0}.d4{animation-delay:.2s;opacity:0}
        .d5{animation-delay:.25s;opacity:0}.d6{animation-delay:.3s;opacity:0}
        .scrollbar::-webkit-scrollbar{width:5px}
        .scrollbar::-webkit-scrollbar-track{background:rgba(255,255,255,.05);border-radius:10px}
        .scrollbar::-webkit-scrollbar-thumb{background:rgba(20,184,166,.4);border-radius:10px}
        .skill-tag{transition:all .2s ease;}
        .skill-tag:hover{transform:scale(1.05);}
      `}</style>

      <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">

        {/* Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl float" style={{animationDelay:"1.5s"}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl float" style={{animationDelay:"3s"}}></div>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`fixed top-6 right-6 z-100 slide-down px-5 py-3 rounded-xl shadow-2xl font-medium text-sm
            ${toast.type==="error" ? "bg-red-500 text-white" : "bg-linear-to-r from-teal-500 to-cyan-600 text-white"}`}>
            {toast.msg}
          </div>
        )}

        <div className="relative z-10 p-8 max-w-350uto">

          {/* ── Profile Hero Banner ── */}
          <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden mb-8 fade-up">
            {/* Banner gradient */}
            <div className={`h-48 bg-linear-to-r ${avatarBg} opacity-30`}></div>
            <div className="absolute inset-0 h-48 bg-linear-to-r from-transparent via-transparent to-slate-900/80"></div>

            {/* Decorative dots */}
            <div className="absolute top-6 right-6 grid grid-cols-5 gap-2 opacity-20">
              {Array(25).fill(0).map((_,i) => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />)}
            </div>

            <div className="relative px-8 pb-8 -mt-16 flex flex-col lg:flex-row lg:items-end gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className={`w-32 h-32 rounded-3xl bg-linear-to-br{avatarBg} flex items-center justify-center text-4xl font-bold text-white shadow-2xl ring-4 ring-slate-900`}>
                  {initials}
                </div>
                <button
                  onClick={() => fileRef.current.click()}
                  className="absolute -bottom-2 -right-2 w-9 h-9 bg-linear-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" />
              </div>

              {/* Name + Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-1">{profile.firstName} {profile.lastName}</h1>
                    <p className="text-teal-400 font-semibold text-lg">{profile.role}</p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {profile.department}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        {profile.employeeId}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {!editMode ? (
                      <button onClick={() => { setDraft(profile); setEditMode(true); }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-rrom-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button onClick={cancelEdit}
                          className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                          Cancel
                        </button>
                        <button onClick={saveProfile}
                          className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {STATS.map((s, i) => (
              <div key={s.label} className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition-all fade-up d${i+1}`}>
                <div className={`w-12 h-12 bg-linear-to-br ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm mb-1">{s.label}</p>
                <p className="text-white text-4xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-2 mb-6 bg-white/5 border border-white/10 rounded-2xl p-1.5 w-fit fade-up d5">
            {[["overview","Overview"],["edit","Edit Info"],["security","Security"],["settings","Settings"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap
                  ${tab===id ? "bg-linear-to-r from-teal-500 to-cyan-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </div>

          {/* ══════════ OVERVIEW TAB ══════════ */}
          {tab === "overview" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 fade-in">
              {/* Left: About + Skills */}
              <div className="xl:col-span-2 space-y-6">

                {/* About */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">About</h2>
                  {editMode ? (
                    <textarea
                      value={draft.bio}
                      onChange={e => setDraft(d => ({...d, bio:e.target.value}))}
                      rows={4}
                      className={inputCls + " resize-none"}
                      placeholder="Write something about yourself..."
                    />
                  ) : (
                    <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Skills */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Skills & Expertise</h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {(editMode ? draft : profile).skills.map(sk => (
                      <div key={sk} className="skill-tag flex items-center gap-2 bg-linear-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-teal-300 px-4 py-2 rounded-xl text-sm font-medium">
                        {sk}
                        {editMode && (
                          <button onClick={() => removeSkill(sk)} className="text-teal-400 hover:text-red-400 transition-colors ml-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <div className="flex gap-2">
                      <input value={newSkill} onChange={e => setNewSkill(e.target.value)}
                        onKeyDown={e => e.key==="Enter" && addSkill()}
                        placeholder="Add a skill..." className={inputCls} />
                      <button onClick={addSkill}
                        className="px-5 py-3 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm whitespace-nowrap">
                        Add
                      </button>
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {ACTIVITY.map(a => (
                      <div key={a.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
                        <div className={`w-10 h-10 bg-linear-to-br ${a.color} rounded-full flex items-center justify-center shrink-0`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{a.text}</p>
                          <p className="text-gray-400 text-xs mt-1">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Contact Info + Social */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Contact Info</h2>
                  <div className="space-y-4">
                    {[
                      { icon:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label:"Email",    value:profile.email  },
                      { icon:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label:"Phone",    value:profile.phone  },
                      { icon:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", label:"Location",  value:profile.location },
                      { icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label:"Manager",   value:profile.manager  },
                      { icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label:"Joined",    value:profile.joinDate },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">{item.label}</p>
                          <p className="text-white text-sm font-medium">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Social Links</h2>
                  <div className="space-y-3">
                    {[
                      { label:"LinkedIn", icon:"M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z", value:profile.social.linkedin, color:"text-blue-400" },
                      { label:"GitHub",   icon:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22", value:profile.social.github,   color:"text-white"   },
                      { label:"Twitter",  icon:"M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", value:profile.social.twitter,  color:"text-sky-400"  },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-teal-500/30 transition-all">
                        <svg className={`w-5 h-5 ${s.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                        </svg>
                        <div>
                          <p className="text-gray-400 text-xs">{s.label}</p>
                          <p className="text-white text-sm font-medium">{s.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avatar Color */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Avatar Color</h2>
                  <div className="flex gap-3 flex-wrap">
                    {bgOptions.map(bg => (
                      <button key={bg} onClick={() => setAvatarBg(bg)}
                        className={`w-10 h-10 rounded-xl bg-linear-to-br ${bg} hover:scale-110 transition-all ${avatarBg===bg ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900" : ""}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ EDIT INFO TAB ══════════ */}
          {tab === "edit" && (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Edit Profile Information</h2>
                <div className="flex gap-3">
                  <button onClick={() => setDraft(profile)}
                    className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all text-sm">
                    Reset
                  </button>
                  <button onClick={saveProfile}
                    className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-linear-to-b from-teal-500 to-cyan-600 rounded-full"></div>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">First Name</label>
                      <input value={draft.firstName} onChange={e => setDraft(d=>({...d,firstName:e.target.value}))} className={inputCls} placeholder="First name" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Last Name</label>
                      <input value={draft.lastName} onChange={e => setDraft(d=>({...d,lastName:e.target.value}))} className={inputCls} placeholder="Last name" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Email</label>
                      <input type="email" value={draft.email} onChange={e => setDraft(d=>({...d,email:e.target.value}))} className={inputCls} placeholder="Email address" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Phone</label>
                      <input value={draft.phone} onChange={e => setDraft(d=>({...d,phone:e.target.value}))} className={inputCls} placeholder="Phone number" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Location</label>
                      <input value={draft.location} onChange={e => setDraft(d=>({...d,location:e.target.value}))} className={inputCls} placeholder="City, Country" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Bio</label>
                      <textarea value={draft.bio} onChange={e => setDraft(d=>({...d,bio:e.target.value}))} rows={4} className={inputCls+" resize-none"} placeholder="Tell something about yourself..." />
                    </div>
                  </div>
                </div>

                {/* Work Info */}
                <div>
                  <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-linear-to-b from-teal-500 to-cyan-600 rounded-full"></div>
                    Work Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Department</label>
                      <select value={draft.department} onChange={e => setDraft(d=>({...d,department:e.target.value}))} className={inputCls}>
                        {["Engineering","Marketing","Sales","HR","Finance","Operations","Design","Product"].map(dep => (
                          <option key={dep}>{dep}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Role / Job Title</label>
                      <input value={draft.role} onChange={e => setDraft(d=>({...d,role:e.target.value}))} className={inputCls} placeholder="Job title" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Employee ID</label>
                      <input value={draft.employeeId} disabled className={inputCls+" opacity-50 cursor-not-allowed"} />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Join Date</label>
                      <input type="date" value={draft.joinDate} disabled className={inputCls+" opacity-50 cursor-not-allowed"} />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Manager</label>
                      <input value={draft.manager} onChange={e => setDraft(d=>({...d,manager:e.target.value}))} className={inputCls} placeholder="Manager name" />
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-linear-to-b from-teal-500 to-cyan-600 rounded-full"></div>
                    Social Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["linkedin","github","twitter"].map(key => (
                      <div key={key}>
                        <label className="text-gray-300 text-sm font-medium mb-2 block capitalize">{key}</label>
                        <input value={draft.social[key]} onChange={e => setDraft(d=>({...d,social:{...d.social,[key]:e.target.value}}))}
                          className={inputCls} placeholder={`${key} URL`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ SECURITY TAB ══════════ */}
          {tab === "security" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 fade-in">
              {/* Change Password */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                <div className="space-y-4">
                  {[
                    { label:"Current Password", key:"current" },
                    { label:"New Password",      key:"next"    },
                    { label:"Confirm Password",  key:"confirm" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">{f.label}</label>
                      <input type="password" value={pwForm[f.key]}
                        onChange={e => { setPwError(""); setPwForm(p=>({...p,[f.key]:e.target.value})); }}
                        placeholder="••••••••" className={inputCls} />
                    </div>
                  ))}
                  {pwError && <p className="text-red-400 text-sm">{pwError}</p>}
                  <button onClick={changePassword}
                    className="w-full py-3 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Security Info */}
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Account Security</h2>
                  <div className="space-y-4">
                    {[
                      { label:"Two-Factor Authentication", sub:"Add an extra layer of security", icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", status:"Not Enabled", statusColor:"text-red-400" },
                      { label:"Login Alerts",              sub:"Get notified of new logins",    icon:"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", status:"Enabled",     statusColor:"text-green-400" },
                      { label:"Active Sessions",           sub:"1 device currently signed in",  icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2",                                                                                                          status:"1 active",    statusColor:"text-teal-400"  },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-linear-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{item.label}</p>
                            <p className="text-gray-400 text-xs">{item.sub}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold ${item.statusColor}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ SETTINGS TAB ══════════ */}
          {tab === "settings" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 fade-in">
              {/* Notifications */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key:"emailTasks",    label:"Task Assignments",  sub:"Get notified when a task is assigned"  },
                    { key:"emailLeave",    label:"Leave Updates",     sub:"Updates on leave request status"       },
                    { key:"emailReports", label:"Weekly Reports",    sub:"Receive weekly performance summaries"  },
                    { key:"browserAlerts",label:"Browser Alerts",    sub:"Real-time browser notifications"       },
                    { key:"weeklyDigest", label:"Weekly Digest",     sub:"Summary of the week every Monday"      },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div>
                        <p className="text-white font-medium text-sm">{item.label}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                      </div>
                      <button
                        onClick={() => setNotifs(n => ({...n,[item.key]:!n[item.key]}))}
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${notifs[item.key] ? "bg-linear-to-r from-teal-500 to-cyan-600" : "bg-white/10"}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${notifs[item.key] ? "left-7" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Account Preferences</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Language</label>
                      <select className={inputCls}>
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Timezone</label>
                      <select className={inputCls}>
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC+0 (GMT)</option>
                        <option>UTC+5:30 (IST)</option>
                        <option>UTC+8 (SGT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Date Format</label>
                      <select className={inputCls}>
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-500/5 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-500/5 rounded-xl border border-red-500/20">
                      <div>
                        <p className="text-white font-medium text-sm">Deactivate Account</p>
                        <p className="text-gray-400 text-xs">Temporarily disable your account</p>
                      </div>
                      <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold hover:bg-red-500/30 transition-all">
                        Deactivate
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-500/5 rounded-xl border border-red-500/20">
                      <div>
                        <p className="text-white font-medium text-sm">Delete Account</p>
                        <p className="text-gray-400 text-xs">Permanently delete all your data</p>
                      </div>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-all">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}