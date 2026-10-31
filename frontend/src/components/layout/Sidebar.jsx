import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';
import {
  Sparkles,
  LayoutDashboard,
  Mic,
  FileText,
  Briefcase,
  Bookmark,
  Send,
  User,
  Compass,
  Building2,
  Users,
  PlusCircle,
  Calendar,
  CheckCircle,
  ShieldCheck,
  HelpCircle,
  LogOut,
  X,
  FileCheck
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout, isStudent, isCompany, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentLinks = [
    { label: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'AI Mock Interview', path: '/student/mock-interview', icon: <Mic className="w-4 h-4" />, highlight: true },
    { label: 'Course Tracks & Pricing', path: '/student/pricing', icon: <Sparkles className="w-4 h-4 text-emerald-400" />, badge: '5 Tracks' },
    { label: 'Interview History & Reports', path: '/student/history', icon: <FileText className="w-4 h-4" /> },
    { label: 'AI Learning Roadmap', path: '/student/roadmap', icon: <Compass className="w-4 h-4" /> },
    { label: 'Explore Jobs', path: '/student/jobs', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Saved Jobs', path: '/student/saved-jobs', icon: <Bookmark className="w-4 h-4" /> },
    { label: 'My Applications', path: '/student/applications', icon: <Send className="w-4 h-4" /> },
    { label: 'Profile & Resume', path: '/student/profile', icon: <User className="w-4 h-4" /> },
  ];

  const companyLinks = [
    { label: 'Dashboard', path: '/company/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Job Openings', path: '/company/jobs', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Post New Job', path: '/company/jobs/new', icon: <PlusCircle className="w-4 h-4" />, highlight: true },
    { label: 'Applicants (ATS)', path: '/company/applicants', icon: <Users className="w-4 h-4" /> },
    { label: 'AI Candidate Screening', path: '/company/screening', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Interview Scheduling', path: '/company/interviews', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Company Profile', path: '/company/profile', icon: <Building2 className="w-4 h-4" /> },
  ];

  const adminLinks = [
    { label: 'Admin Overview', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Verify Companies', path: '/admin/companies', icon: <Building2 className="w-4 h-4" />, badge: 'Priority' },
    { label: 'Student Management', path: '/admin/students', icon: <Users className="w-4 h-4" /> },
    { label: 'Job Moderation', path: '/admin/jobs', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Question Bank', path: '/admin/questions', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const links = isAdmin ? adminLinks : isCompany ? companyLinks : studentLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#171923]/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r border-[#E8EAED] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-[#E8EAED] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-[#171923] tracking-tight">
                Interview<span className="text-[#6655D9]">IQ</span>
              </span>
              <p className="text-[10px] text-[#737987] font-medium tracking-tight">
                {isAdmin ? 'ADMIN CONSOLE' : isCompany ? 'RECRUITER SUITE' : 'STUDENT PORTAL'}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-700 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Portal Tag Badge */}
        <div className="px-6 py-3 bg-[#F8F9FC] border-b border-[#E8EAED]/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#737987]">Current Session:</span>
          <Badge
            variant={isAdmin ? 'danger' : isCompany ? 'primary' : 'accent'}
            size="sm"
            dot
          >
            {isAdmin ? 'Administrator' : isCompany ? 'Verified Company' : 'Candidate'}
          </Badge>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#737987]">
            Platform Menu
          </p>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#6655D9] text-white shadow-button shadow-[#6655D9]/25'
                    : link.highlight
                    ? 'bg-[#F4F2FF] text-[#6655D9] hover:bg-[#EBE6FF]'
                    : 'text-[#737987] hover:text-[#171923] hover:bg-[#F8F9FC]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                {link.icon}
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-700">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-[#E8EAED] bg-[#F8F9FC]/60">
          <div className="flex items-center gap-3 mb-3 p-2 rounded-xl bg-white border border-[#E8EAED]">
            <img
              src={user?.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}
              alt={user?.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#6655D9]/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#171923] truncate">{user?.name || 'InterviewIQ User'}</p>
              <p className="text-[10px] text-[#737987] truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
