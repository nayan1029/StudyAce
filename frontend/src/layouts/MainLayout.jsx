import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { sessionService } from '../services/session'
import ThemeToggle from '../components/common/ThemeToggle'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Bot,
  BrainCircuit,
  CheckSquare,
  CalendarDays,

  Briefcase,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/classes', label: 'Classes', icon: Users },
  { to: '/notes', label: 'Notes', icon: BookOpen },
  { to: '/summarizer', label: 'Summarizer', icon: FileText },
  { to: '/assistant', label: 'Assistant', icon: Bot },
  { to: '/quiz', label: 'Quiz', icon: BrainCircuit },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/timetable', label: 'Timetable', icon: CalendarDays },

  { to: '/resume', label: 'Resume', icon: Briefcase },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = sessionService.getUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const onLogout = () => {
    sessionService.clearSession()
    navigate('/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-red-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/30 group-hover:shadow-red-900/50 transition-all duration-300 transform group-hover:scale-105">
            CE
          </div>
          <span className="font-bold text-xl text-red-900 dark:text-red-800">
            ClassEdge
          </span>
        </Link>
        
        {/* Mobile Close Button */}
        <button 
          className="lg:hidden text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                  isActive 
                    ? 'text-red-700 bg-red-50 font-semibold'
                    : 'text-black hover:bg-teal-100 hover:text-black'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={20} 
                    className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                  />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-red-600 dark:bg-red-400 rounded-r-full" />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-teal-200 bg-teal-50/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white shadow-sm border border-teal-100">
          <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center text-white font-bold uppercase shrink-0">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-black truncate">
              {user?.name || 'Student'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || 'student@classedge.com'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 [&>button]:w-full">
             <ThemeToggle />
          </div>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-transparent overflow-hidden selection:bg-red-900/30">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-full bg-white/80 backdrop-blur-xl border-r border-teal-200/50 shadow-xl z-20 flex-shrink-0 transition-all duration-300">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 dark:bg-teal-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-teal-200/50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-black hover:bg-teal-100 transition-colors"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-lg text-red-900">
              ClassEdge
            </span>
          </div>
          <ThemeToggle />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 right-0 h-96 bg-red-900/10 pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Global styles for custom scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
        }
      `}} />
    </div>
  )
}
