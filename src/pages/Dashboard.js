import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUsers, FiDollarSign, FiCalendar } from 'react-icons/fi';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Unauthorized</div>;

  // Data statistik dengan warna dan ikon berbeda
  const stats = [
    { 
      name: 'Total Employees', 
      value: '24', 
      icon: FiUsers, 
      change: '+12%', 
      changeType: 'increase', 
      color: 'bg-blue-500' 
    },
    { 
      name: 'Total Salaries', 
      value: '$12,345', 
      icon: FiDollarSign, 
      change: '+5%', 
      changeType: 'increase', 
      color: 'bg-green-500' 
    },
    { 
      name: 'Pending Leaves', 
      value: '5', 
      icon: FiCalendar, 
      change: '-2', 
      changeType: 'decrease', 
      color: 'bg-yellow-500' 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-faint dark:text-faint-dark">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink dark:text-ink-dark sm:text-4xl">
          Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {user.name.split(' ')[0]}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-muted dark:text-muted-dark">
          Here&apos;s what&apos;s happening across your workforce today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl border border-line bg-surface p-5 transition-colors duration-150 hover:border-line2 dark:border-line-dark dark:bg-surface-dark dark:hover:border-line2-dark"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted dark:text-muted-dark">
                {stat.name}
              </p>
              <stat.icon className="h-5 w-5 text-muted dark:text-muted-dark" aria-hidden="true" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-ink dark:text-ink-dark sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-sm">
              <span className={stat.changeType === 'increase' ? 'text-success' : 'text-danger'}>
                {stat.changeType === 'increase' ? '↑' : '↓'} {stat.change}
              </span>
              <span className="text-faint dark:text-faint-dark">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      <section className="border-t border-line dark:border-line-dark">
        <h2 className="text-lg font-semibold text-ink dark:text-ink-dark">
          Welcome back, {user.name}
        </h2>
        <p className="mt-2 text-muted dark:text-muted-dark">
          You&apos;re signed in as{' '}
          <span className="font-medium capitalize text-ink dark:text-ink-dark">
            {user.role.replace('_', ' ')}
          </span>
          .
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
