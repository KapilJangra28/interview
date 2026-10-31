import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Welcome & Auth Pages
import { WelcomeSelectionPage } from './pages/auth/WelcomeSelectionPage';
import { StudentAuthPage } from './pages/auth/StudentAuthPage';
import { CompanyAuthPage } from './pages/auth/CompanyAuthPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

// Landing Page
import { LandingPage } from './pages/landing/LandingPage';

// Student Portal Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MockInterviewConfig } from './pages/student/MockInterviewConfig';
import { InterviewRoom } from './pages/student/InterviewRoom';
import { InterviewHistory } from './pages/student/InterviewHistory';
import { InterviewReport } from './pages/student/InterviewReport';
import { LearningRoadmap } from './pages/student/LearningRoadmap';
import { StudentProfile } from './pages/student/StudentProfile';
import { PricingCatalog } from './pages/student/PricingCatalog';
import { JobBrowse } from './pages/student/JobBrowse';
import { SavedJobs } from './pages/student/SavedJobs';
import { ApplicationsList } from './pages/student/ApplicationsList';

// Company Portal Pages
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { CompanyProfile } from './pages/company/CompanyProfile';
import { JobManagement } from './pages/company/JobManagement';
import { CreateJobPage } from './pages/company/CreateJobPage';
import { ApplicantManagement } from './pages/company/ApplicantManagement';
import { AiCandidateScreening } from './pages/company/AiCandidateScreening';
import { InterviewScheduling } from './pages/company/InterviewScheduling';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCompanyVerification } from './pages/admin/AdminCompanyVerification';
import { AdminStudentManagement } from './pages/admin/AdminStudentManagement';
import { AdminJobModeration } from './pages/admin/AdminJobModeration';
import { AdminQuestionBank } from './pages/admin/AdminQuestionBank';

// Protected Route Guard (Role-Based Access Enforcement)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  // If user is not logged in, redirect to the Welcome Selection page
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // If user does not have required role, redirect to their dedicated dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'company') {
      return <Navigate to="/company/dashboard" replace />;
    }
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/student/dashboard" replace />;
  }
  
  return children;
};

export const App = () => {
  return (
    <Routes>
      {/* 1. Login Selection / Welcome Page (Default Entry) */}
      <Route path="/" element={<WelcomeSelectionPage />} />
      <Route path="/welcome" element={<WelcomeSelectionPage />} />

      {/* Full Platform Overview / Landing Page */}
      <Route path="/home" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/jobs" element={<JobBrowse />} />

      {/* 2 & 3. Role-Based Login & Registration Pages */}
      <Route path="/login" element={<WelcomeSelectionPage />} />
      <Route path="/login/student" element={<StudentAuthPage />} />
      <Route path="/login/company" element={<CompanyAuthPage />} />
      <Route path="/register" element={<StudentAuthPage />} />
      <Route path="/register/company" element={<CompanyAuthPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Student Portal Routes (Restricted strictly to students) */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/mock-interview"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <MockInterviewConfig />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/interview-room"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <InterviewRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/history"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <InterviewHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/report/:id"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <InterviewReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/roadmap"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <LearningRoadmap />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/pricing"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <PricingCatalog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/courses"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <PricingCatalog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/jobs"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <JobBrowse />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/saved-jobs"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <SavedJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/applications"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <ApplicationsList />
          </ProtectedRoute>
        }
      />

      {/* Company Portal Routes (Restricted strictly to companies) */}
      <Route
        path="/company/dashboard"
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/profile"
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/jobs"
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <JobManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/jobs/new"
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <CreateJobPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/applicants"
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <ApplicantManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/screening"
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <AiCandidateScreening />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/interviews"
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <InterviewScheduling />
          </ProtectedRoute>
        }
      />

      {/* Admin Portal Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/companies"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminCompanyVerification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminStudentManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminJobModeration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/questions"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminQuestionBank />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
