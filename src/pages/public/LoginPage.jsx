// src/pages/public/LoginPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner'; // Spinner import kiya

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex justify-center items-center py-12 md:py-20 animate-fade-in-up"> {/* Animations aur padding */}
      <Card className="max-w-md w-full p-8 md:p-10 shadow-strong-lg"> {/* Stronger shadow aur padding */}
        <h2 className="text-3xl font-extrabold text-center text-heading mb-8">Log in to your account</h2> {/* Bolder text */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="w-full text-lg py-3.5" disabled={loading}> {/* Bigger button */}
            {loading ? <Spinner size="sm" /> : 'Login'} {/* Spinner use kiya */}
          </Button>
        </form>
        <p className="mt-6 text-center text-base text-body"> {/* Font size update kiya */}
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-primary hover:underline hover:text-primary-dark transition-colors duration-200">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
