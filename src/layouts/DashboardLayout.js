import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  FiMoon,
  FiSun,
  FiUser,
  FiHome,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiMenu,
} from 'react-icons/fi';
import { HiOfficeBuilding } from 'react-icons/hi';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    if (!user) return [];

    const commonItems = [
      { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
      { name: 'Profile', icon: FiUser, path: '/profile' },
    ];

    if (user.role === 'super_admin') {
      return [
        ...commonItems,
        { name: 'Companies', icon: HiOfficeBuilding, path: '/companies' },
        { name: 'Users', icon: FiUsers, path: '/users' },
      ];
    } else if (user.role === 'admin') {
      return [
        ...commonItems,
        { name: 'Employees', icon: FiUsers, path: '/employees' },
        { name: 'Salaries', icon: FiDollarSign, path: '/salaries' },
        { name: 'Leaves', icon: FiCalendar, path: '/leaves' },
      ];
    } else if (user.role === 'employee') {
      return [
        ...commonItems,
        { name: 'My Salaries', icon: FiDollarSign, path: '/my-salaries' },
        { name: 'My Leaves', icon: FiCalendar, path: '/my-leaves' },
      ];
    }

    return commonItems;
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Sidebar with Logout Prop */}
      <Sidebar
        items={getNavItems()}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar>
          {/* Hamburger button (optional) */}
          <button
            className="md:hidden p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:shadow-md transition-all"
            onClick={() => setSidebarOpen(true)}
            title="Open Sidebar"
          >
            <FiMenu className="text-indigo-600 dark:text-white" />
          </button>

          {/* Toggle Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:shadow-md transition-all"
            title="Toggle Dark Mode"
          >
            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-indigo-600" />}
          </button>
        </Navbar>

        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900 shadow-inner rounded-tl-2xl transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
