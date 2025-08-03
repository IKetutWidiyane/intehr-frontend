import React from 'react';
import PropTypes from 'prop-types';
import { FiUser, FiBell, FiChevronDown } from 'react-icons/fi';

const Navbar = ({ children }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <img
              src="/profilebright.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm transition-transform hover:scale-105"
            />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white tracking-wide">
              InteHR Dashboard
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {children}

            {/* Notification */}
            <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white relative">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-2 cursor-pointer group">
              <FiUser className="text-gray-600 dark:text-gray-300 w-5 h-5 group-hover:text-black dark:group-hover:text-white" />
              <img
                src="/profilebright.jpg"
                alt="Profile"
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 object-cover shadow-sm"
              />
              <FiChevronDown className="text-gray-600 dark:text-gray-300 w-4 h-4 transition-transform group-hover:rotate-180" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
