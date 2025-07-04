import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';

const SidebarItem = ({ item, isCollapsed }) => (
  <NavLink
    to={item.path}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
        isActive
          ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`
    }
  >
    <item.icon className="w-5 h-5" />
    {!isCollapsed && <span className="ml-3 text-sm">{item.name}</span>}
  </NavLink>
);

const Sidebar = ({ items, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 border-r bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-800 dark:text-gray-200 shadow-sm`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between h-16 px-4">
        {!isCollapsed && (
          <img
            src="/logointehr.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-2 py-4 space-y-1">
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} isCollapsed={isCollapsed} />
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto px-2 py-4">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded-md transition-all"
        >
          <FiLogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Sidebar;
