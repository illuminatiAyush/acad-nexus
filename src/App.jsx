import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { ApprovalsPage } from './pages/Approvals';
import { CalendarPage } from './pages/Calendar';
import { AlertsPage } from './pages/Alerts';
import { AcademicProvider } from './context/AcademicContext';

function App() {
  return (
    <AcademicProvider> {/* 2. Wrap the entire Router */}
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/approvals" element={<ApprovalsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
          </Route>
        </Routes>
      </Router>
    </AcademicProvider>
  );
} 

export default App;