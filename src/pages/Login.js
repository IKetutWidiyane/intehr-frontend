import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard'); // arahkan ke dashboard setelah login berhasil
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4 dark:bg-canvas-dark">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-8 space-y-6 dark:border-line-dark dark:bg-surface-dark">

        <div className="flex justify-center">
          <img
            src="/logointehr.png"
            alt="InteHR Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-ink dark:text-ink-dark">
            Welcome to InteHR
          </h2>
          <p className="mt-1 text-sm text-muted dark:text-muted-dark">
            A calmer way to run HR. Sign in to continue.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger dark:text-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink dark:text-ink-dark">
              Email Address
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiMail className="text-muted dark:text-muted-dark" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-line bg-surface py-2 pl-10 pr-4 text-sm text-ink placeholder:text-faint focus:border-accent focus:ring-1 focus:ring-accent/30 dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark dark:placeholder:text-faint-dark"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink dark:text-ink-dark">
              Password
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLock className="text-muted dark:text-muted-dark" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-line bg-surface py-2 pl-10 pr-4 text-sm text-ink placeholder:text-faint focus:border-accent focus:ring-1 focus:ring-accent/30 dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark dark:placeholder:text-faint-dark"
              />
            </div>
            <div className="mt-1 text-right">
              <a href="#" className="text-sm text-muted hover:text-ink dark:text-muted-dark dark:hover:text-white">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2.5 text-sm font-semibold text-white bg-accent transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/40 ${
              loading ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-xs text-muted dark:text-muted-dark">
          Your credentials are safe and encrypted.
        </p>
      </div>
    </div>
  );
};

export default Login;
