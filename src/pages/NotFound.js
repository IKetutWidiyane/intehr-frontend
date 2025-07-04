import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <p className="text-2xl font-medium text-gray-900 dark:text-white mt-4">Page Not Found</p>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate('/dashboard')}>
            Go Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;