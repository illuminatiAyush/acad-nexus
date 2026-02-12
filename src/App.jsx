import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { ApprovalsPage } from './pages/Approvals';
import { CalendarPage } from './pages/Calendar';
import { AlertsPage } from './pages/Alerts';
import { LoginPage } from './pages/Login';
import { RequestsPage } from './pages/Requests';
import { LandingPage } from './pages/LandingPage';
// FIXED: Import useAcademic so we can check if user is logged in
import { AcademicProvider, useAcademic } from './context/AcademicContext';

// --- ROUTE GUARDS ---

// 1. If user is NOT logged in, kick them to Login page
const ProtectedRoute = ({ children }) => {
  const { user } = useAcademic();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// 2. If user IS logged in, kick them to Dashboard (away from Landing/Login)
const PublicOnlyRoute = ({ children }) => {
  const { user } = useAcademic();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <AcademicProvider>
      <Router>
        <Routes>
          
          {/* --- PUBLIC ROUTES --- */}
          {/* If logged in, these redirect to /dashboard automatically */}
          <Route path="/" element={
            <PublicOnlyRoute>
              <LandingPage />
            </PublicOnlyRoute>
          } />
          
          <Route path="/login" element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          } />

          {/* --- PRIVATE APP ROUTES --- */}
          {/* Protected by MainLayout and Login Check */}
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            {/* FIXED: Dashboard is now at /dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/approvals" element={<ApprovalsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/request" element={<RequestsPage />} />
          </Route>

          {/* Catch-all: Send lost users to Landing Page */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AcademicProvider>
  );
}

export default App;