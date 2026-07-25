import React from 'react';
import {Link} from 'react-router-dom';



export default function EMSLandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Outfit', sans-serif;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(20, 184, 166, 0.6);
          }
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .btn-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .btn-hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .btn-hover:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #14b8a6, #06b6d4);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative flex items-center justify-between px-8 py-4 glass-effect animate-fade-in-down">
        <div className="flex items-center gap-2 animate-scale-in">
          <div className="w-10 h-10 bg-linear-to-br from-teal-400 to-cyan-600 rounded-lg flex items-center justify-center animate-pulse-glow">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white">Employee Management System</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
        
          <a href="#features" className="nav-link text-white hover:text-teal-400">Features</a>
          <a href="#about" className="nav-link text-white hover:text-teal-400">About</a>
          <a href="#contact" className="nav-link text-white hover:text-teal-400">Contact</a>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/Login">
          <button className="btn-hover px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 backdrop-blur-sm font-medium border border-white/20">
            Log In
          </button>
          </Link>
          <Link to="/Signup">
          <button className="btn-hover px-6 py-2 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-xl font-medium">
            Sign Up
          </button>\
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-8 py-32 overflow-hidden">
        {/* Animated wave background */}
        <div className="absolute bottom-0 left-0 right-0 h-80">
          <svg className="absolute bottom-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path fill="url(#wave-gradient)" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
                M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,128C672,149,768,171,864,165.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
            </path>
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#14b8a6', stopOpacity: 0.6}} />
                <stop offset="50%" style={{stopColor: '#06b6d4', stopOpacity: 0.6}} />
                <stop offset="100%" style={{stopColor: '#0891b2', stopOpacity: 0.6}} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 animate-fade-in-up delay-100">
            <span className="px-4 py-2 bg-linear-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-500/30 rounded-full text-teal-300 text-sm font-semibold">
              ✨ Modern HR Solution
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in-up delay-200 leading-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-teal-100 to-cyan-100 animate-gradient">
              Employee Management
            </span>
            <br />
            <span className="text-teal-400">System</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up delay-300">
            Manage employees, tasks & attendance in one place.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap animate-fade-in-up delay-400">
              <Link to="/Signup">
            <button className="btn-hover px-10 py-4 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:shadow-2xl font-semibold text-lg group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            </Link>
            <Link to="/Login">
            <button className="btn-hover px-10 py-4 glass-effect text-white rounded-xl hover:bg-white/10 font-semibold text-lg">
              Log In
            </button>
            </Link>
          </div>
          
          {/* Floating cards decoration */}
          <div className="mt-20 grid grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up delay-500">
            <div className="glass-effect p-4 rounded-xl card-hover">
              <div className="text-teal-400 text-3xl font-bold">500+</div>
              <div className="text-gray-400 text-sm">Companies</div>
            </div>
            <div className="glass-effect p-4 rounded-xl card-hover" style={{animationDelay: '0.6s'}}>
              <div className="text-cyan-400 text-3xl font-bold">50K+</div>
              <div className="text-gray-400 text-sm">Employees</div>
            </div>
            <div className="glass-effect p-4 rounded-xl card-hover" style={{animationDelay: '0.7s'}}>
              <div className="text-blue-400 text-3xl font-bold">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 px-8 py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 animate-fade-in-up">
              Powerful <span className="bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-cyan-400">Features</span>
            </h2>
            <p className="text-gray-400 text-lg animate-fade-in-up delay-100">Everything you need to manage your workforce efficiently</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {/* Feature Card 1 */}
            <div className="group relative animate-fade-in-up delay-200">
              <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 card-hover">
                <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">Employee Records</h3>
                <p className="text-gray-400 leading-relaxed">Manage all employee data easily with comprehensive profiles and instant access to information.</p>
              </div>
            </div>
            
            {/* Feature Card 2 */}
            <div className="group relative animate-fade-in-up delay-300">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 card-hover">
                <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Attendance Tracking</h3>
                <p className="text-gray-400 leading-relaxed">Track daily attendance seamlessly with automated check-ins and real-time monitoring.</p>
              </div>
            </div>
            
            {/* Feature Card 3 */}
            <div className="group relative animate-fade-in-up delay-400">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 card-hover">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Task Management</h3>
                <p className="text-gray-400 leading-relaxed">Assign and manage employee tasks efficiently with priority tracking and deadlines.</p>
              </div>
            </div>
          </div>

          {/* Reports & Analytics Section */}
          <div className="relative animate-fade-in-up delay-500">
            <div className="absolute inset-0 bg-linear-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-slate-800/30 backdrop-blur-md border border-slate-700/30 rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  Reports & <span className="bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-cyan-400">Analytics</span>
                </h2>
                <p className="text-gray-400">Gain insights with powerful data visualization</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300 card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-linear-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">Employee Records</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Manage info easily</p>
                </div>
                
                <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">Attendance Tracking</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Track daily attendance</p>
                </div>
                
                <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Task Management</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Assign tasks</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="group relative max-w-md w-full">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  <div className="relative bg-linear-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 card-hover">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Reports & Analytics</h3>
                    </div>
                    <p className="text-gray-400">Analyze employee productivity with detailed insights and metrics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative px-8 py-32 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-teal-900/30 via-slate-900 to-cyan-900/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Ready to get <span className="bg-clip-text text-transparent bg-linear-to-r from-teal-400 via-cyan-400 to-blue-400 animate-gradient">started?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join hundreds of companies already managing their workforce efficiently with EMS
            </p>
            <Link to="/Signup">
            <button className="btn-hover px-16 py-5 bg-linear-to-r from-teal-500 via-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-2xl font-bold text-xl group relative animate-pulse-glow">
              <span className="relative z-10 flex items-center gap-3">
                Sign Up Now
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            </Link>
            
            <div className="mt-12 flex items-center justify-center gap-12 text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative bg-slate-950 px-8 py-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-teal-400 to-cyan-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white">EMS</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Modern employee management system designed to streamline your workforce operations.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-teal-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-teal-400 transition">About</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-center md:text-left">
              Built by Raj Sharma 
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}