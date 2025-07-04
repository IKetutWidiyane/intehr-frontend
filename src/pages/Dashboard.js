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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 transition transform hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-md ${stat.color} shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {stat.name}
                </dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
                <div className={`text-sm mt-1 ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.changeType === 'increase' ? '▲' : '▼'} {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-xl p-6 dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Welcome back, {user.name}!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          You're logged in as <span className="font-semibold capitalize">{user.role.replace('_', ' ')}</span>.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
