import React from 'react';
import PropTypes from 'prop-types';
import { FiUser } from 'react-icons/fi';

const Navbar = ({ children }) => {
  return (
    <div className="bg-[linear-gradient(to_right,_#00C6FB,_#005BEA)] shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white tracking-wide">
              InteHR Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {children}
            <FiUser className="text-white w-5 h-5" />
            <img
            src="/profilebright.jpg"
            alt="Logo"
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
