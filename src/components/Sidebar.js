import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiLogOut, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';

const SidebarItem = ({ item, isCollapsed, onClick }) => (
  <NavLink
    to={item.path}
    onClick={onClick}
    className={({ isActive }) =>
      `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-400/20'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
      }`
    }
    title={isCollapsed ? item.name : undefined}
  >
    {({ isActive }) => (
      <>
        <span
          className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-opacity ${
            isActive ? 'bg-blue-600 opacity-100 dark:bg-blue-300' : 'opacity-0'
          }`}
        />
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            isActive
              ? 'bg-white text-blue-700 dark:bg-slate-950 dark:text-blue-200'
              : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700 dark:group-hover:text-white'
          }`}
        >
          <item.icon className="h-5 w-5" />
        </span>
        {!isCollapsed && <span className="truncate">{item.name}</span>}
      </>
    )}
  </NavLink>
);

const Sidebar = ({ items, onLogout, isOpen, onClose, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/60 transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:shadow-black/20 md:relative md:translate-x-0 ${
          isCollapsed ? 'md:w-20' : 'md:w-72'
        } ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 md:translate-x-0'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4 dark:border-slate-900">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 p-1.5 dark:bg-white">
              <img src="/logointehr.png" alt="InteHR" className="h-full w-full object-contain" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-5 text-slate-950 dark:text-white">
                  InteHR
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  Human Resources
                </p>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white md:flex"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            type="button"
          >
            {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
          </button>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white md:hidden"
            title="Close sidebar"
            type="button"
          >
            <FiX size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {!isCollapsed && (
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Menu
            </p>
          )}
          {items.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              isCollapsed={isCollapsed}
              onClick={onClose}
            />
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3 dark:border-slate-900">
          {!isCollapsed && user && (
            <div className="mb-3 rounded-lg bg-slate-50 px-3 py-3 dark:bg-slate-900">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
              <p className="truncate text-xs capitalize text-slate-500 dark:text-slate-400">
                {user.role?.replace('_', ' ')}
              </p>
            </div>
          )}

          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
            type="button"
            title={isCollapsed ? 'Logout' : undefined}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300">
              <FiLogOut className="h-5 w-5" />
            </span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

SidebarItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

SidebarItem.defaultProps = {
  onClick: undefined,
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
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

Sidebar.defaultProps = {
  isOpen: false,
  onClose: undefined,
  user: null,
};

export default Sidebar;
