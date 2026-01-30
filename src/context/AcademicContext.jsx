import { createContext, useContext, useState, useEffect } from 'react';

const AcademicContext = createContext();

export const AcademicProvider = ({ children }) => {
  // --- EXISTING USER LOGIC ---
  const [user, setUser] = useState({
    name: "Dr. Alex Rivera",
    role: "faculty", 
    dept: "Computer Science"
  });

  const [requests, setRequests] = useState([
    { id: 1, student: "John Smith", type: "Medical Leave", status: "Pending", time: "2h ago" },
    { id: 2, student: "Sarah Lee", type: "Internship NOC", status: "Pending", time: "5h ago" }
  ]);

  const [notification, setNotification] = useState(null);

  // --- NEW: DARK MODE LOGIC ---
  // 1. Check local storage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // 2. Apply the class to the HTML tag whenever state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // --- EXISTING ACTIONS ---
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const switchRole = (newRole) => {
    if (newRole === 'student') {
      setUser({ name: "Rahul Sharma", role: "student", dept: "CS-A" });
      showNotification("Switched to Student View");
    } else {
      setUser({ name: "Dr. Alex Rivera", role: "faculty", dept: "Computer Science" });
      showNotification("Switched to Faculty View");
    }
  };

  const addRequest = (newRequest) => {
    const request = {
      id: Date.now(),
      student: user.name,
      time: "Just now",
      status: "Pending",
      ...newRequest
    };
    setRequests([request, ...requests]);
    showNotification("Request submitted successfully!");
  };

  const resolveRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    showNotification("Request approved");
  };

  return (
    <AcademicContext.Provider value={{ 
      user, 
      requests, 
      addRequest, 
      resolveRequest, 
      showNotification, 
      switchRole,
      darkMode,        // Exporting state
      toggleDarkMode   // Exporting function
    }}>
      {children}
      {notification && (
        <div className={`fixed bottom-24 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all transform translate-y-0 z-50 ${
          notification.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        }`}>
          {notification.message}
        </div>
      )}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => useContext(AcademicContext);