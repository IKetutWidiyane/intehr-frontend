import React from 'react';
import PropTypes from 'prop-types';
import { FiBell, FiChevronDown } from 'react-icons/fi';

const Navbar = ({ children, title, user }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {children}
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              InteHR Dashboard
            </p>
            <h1 className="truncate text-lg font-semibold text-slate-950 dark:text-white sm:text-xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white"
            type="button"
            title="Notifications"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
          </button>

          <div className="group flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-2 py-1.5 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900">
            <img
              src="/profilebright.jpg"
              alt="Profile"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div className="hidden min-w-0 text-left sm:block">
              <p className="max-w-36 truncate text-sm font-semibold text-slate-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="truncate text-xs capitalize text-slate-500 dark:text-slate-400">
                {user?.role?.replace('_', ' ') || 'Account'}
              </p>
            </div>
            <FiChevronDown className="h-4 w-4 text-slate-400 transition-transform group-hover:rotate-180" />
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

Navbar.defaultProps = {
  title: 'Dashboard',
  user: null,
};

export default Navbar;
