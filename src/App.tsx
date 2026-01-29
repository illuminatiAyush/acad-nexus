import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { ApprovalsPage } from './pages/Approvals';
import { CalendarPage } from './pages/Calendar';

// DELETE the old "const CalendarPage = ..." line that was here!

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/alerts" element={<div>Alerts Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;