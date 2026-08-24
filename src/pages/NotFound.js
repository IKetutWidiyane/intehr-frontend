import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6 dark:bg-canvas-dark">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-ink dark:text-ink-dark">404</h1>
        <p className="mt-3 text-lg font-medium text-ink dark:text-ink-dark">Page not found</p>
        <p className="mt-2 max-w-md text-muted dark:text-muted-dark">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;