// import React from 'react';
// import { LayoutDashboard, FileText, Calendar, Bell, Settings } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAcademic } from '../../context/AcademicContext'; // Import hook

// export const Sidebar = () => {
//   const location = useLocation();
//   const { user } = useAcademic(); // Get current user role

//   // Dynamic Menu
//   const menuItems = [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
//     { icon: Calendar, label: 'Academic Calendar', path: '/calendar' },
//     { icon: FileText, label: user.role === 'faculty' ? 'Approvals & NOCs' : 'My Requests', path: '/approvals' },
//     // Only show Alerts if user is Faculty
//     ...(user.role === 'faculty' ? [{ icon: Bell, label: 'System Alerts', path: '/alerts' }] : []),
//   ];

//   return (
//     <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
//       <div className="p-6 border-b border-slate-800">
//         <h1 className="text-xl font-bold tracking-tight text-primary-500">
//           Academi<span className="text-white">Flow</span>
//         </h1>
//         <p className="text-xs text-slate-400 mt-1">Stress & Workflow System</p>
//       </div>

//       <nav className="flex-1 p-4 space-y-2">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//                 isActive 
//                   ? 'bg-primary-600 text-white shadow-lg' 
//                   : 'text-slate-400 hover:bg-slate-800 hover:text-white'
//               }`}
//             >
//               <item.icon size={20} />
//               <span className="font-medium">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>
      
//       <div className="p-4 border-t border-slate-800">
//         <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white w-full transition-colors">
//           <Settings size={20} />
//           <span>Settings</span>
//         </button>
//       </div>
//     </aside>
//   );
// };