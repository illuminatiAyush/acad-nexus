import React, { createContext, useContext, useState, useEffect } from 'react';

const AcademicContext = createContext();

export const useAcademic = () => useContext(AcademicContext);

export const AcademicProvider = ({ children }) => {
  // 1. User State (Read from browser storage first)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('acad_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // 3. Data States
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState(null);

  // --- EFFECT: Handle Dark Mode Changes ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // --- ACTIONS ---

  // THE MISSING FUNCTION WAS LIKELY HERE
  const login = (email, role = 'student') => {
    const newUser = {
      name: email.includes('alex') ? "Dr. Alex Rivera" : "Rahul Sharma",
      email: email,
      role: role,
      dept: role === 'faculty' ? "Computer Science" : "CS-A",
      avatar: 'https://i.pravatar.cc/150?u=' + email,
    };
    
    // Save to State AND Browser Storage
    setUser(newUser);
    localStorage.setItem('acad_user', JSON.stringify(newUser));
    return true; // Return true so the login page knows it worked
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('acad_user');
    window.location.href = '/login';
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const updatedUser = { 
        ...user, 
        name: newRole === 'student' ? "Rahul Sharma" : "Dr. Alex Rivera",
        role: newRole,
        dept: newRole === 'student' ? "CS-A" : "Computer Science"
    };
    setUser(updatedUser);
    localStorage.setItem('acad_user', JSON.stringify(updatedUser));
    showNotification(`Switched to ${newRole} view`);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addRequest = (newRequest) => {
    setRequests([...requests, { id: Date.now(), ...newRequest }]);
  };

  const resolveRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  // --- EXPOSING THE FUNCTIONS ---
  // If 'login' is missing from this list, the error happens!
  return (
    <AcademicContext.Provider value={{ 
      user, 
      login,       // <--- CRITICAL: This must be here
      logout,
      switchRole,
      requests, 
      addRequest, 
      resolveRequest, 
      showNotification, 
      darkMode,
      toggleDarkMode
    }}>
      {children}
      
      {/* Global Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white font-medium z-[100] ${
          notification.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        }`}>
          {notification.message}
        </div>
      )}
    </AcademicContext.Provider>
  );
};