import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();

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

  const navItems = getNavItems();
  const currentPage = navItems.find((item) => item.path === location.pathname)?.name || 'Dashboard';

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        items={navItems}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar title={currentPage} user={user}>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white md:hidden"
            onClick={() => setSidebarOpen(true)}
            title="Open Sidebar"
            type="button"
          >
            <FiMenu className="h-5 w-5" />
          </button>

          <button
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white"
            title="Toggle Dark Mode"
            type="button"
          >
            {darkMode ? <FiSun className="h-5 w-5 text-amber-400" /> : <FiMoon className="h-5 w-5" />}
          </button>
        </Navbar>

        <main className="flex-1 overflow-y-auto p-4 transition-colors duration-300 sm:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
