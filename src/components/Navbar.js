import React from 'react';
import PropTypes from 'prop-types';
import { FiBell, FiChevronDown, FiSearch } from 'react-icons/fi';

const Navbar = ({ children, title, user }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur transition-colors duration-300 dark:border-line dark:bg-surface-dark/95">
      <div className="flex h-16 items-center justify-between gap-6 px-6 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {children}
          <div className="min-w-0">
            <p className="text-xs font-medium text-faint dark:text-faint">
              InteHR
            </p>
            <h1 className="truncate text-lg font-semibold tracking-tight text-ink dark:text-ink-dark sm:text-xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="relative hidden md:block">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted dark:text-muted" />
            <input
              id="global-search"
              type="search"
              placeholder="Search…"
              className="h-10 w-56 rounded-lg border border-line bg-transparent pr-3 pl-9 text-sm text-ink placeholder:text-faint focus:border-accent focus:ring-1 focus:ring-accent/30 dark:border-line dark:bg-transparent dark:text-ink-dark dark:placeholder:text-faint"
            />
          </div>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition hover:border-line2 hover:bg-subtle hover:text-ink dark:border-line dark:text-muted dark:hover:border-line2 dark:hover:bg-subtle dark:hover:text-ink"
            type="button"
            title="Notifications"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-surface dark:ring-surface-dark" />
          </button>

          <div className="group flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-surface px-2 py-1.5 transition hover:border-line2 hover:bg-subtle dark:border-line dark:bg-surface-dark dark:hover:border-line2 dark:hover:bg-subtle">
            <img
              src="/profilebright.jpg"
              alt="Profile"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div className="hidden min-w-0 text-left sm:block">
              <p className="max-w-36 truncate text-sm font-semibold text-ink dark:text-ink-dark">
                {user?.name || 'User'}
              </p>
              <p className="truncate text-xs capitalize text-muted dark:text-muted">
                {user?.role?.replace('_', ' ') || 'Account'}
              </p>
            </div>
            <FiChevronDown className="h-4 w-4 text-faint transition-transform group-hover:rotate-180" />
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
