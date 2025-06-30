// src/pages/public/RegisterPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner'; // Spinner import kiya

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role
  const { register, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password, role);
  };

  return (
    <div className="flex justify-center items-center py-12 md:py-20 animate-fade-in-up"> {/* Animations aur padding */}
      <Card className="max-w-md w-full p-8 md:p-10 shadow-strong-lg"> {/* Stronger shadow aur padding */}
        <h2 className="text-3xl font-extrabold text-center text-heading mb-8">Create an account</h2> {/* Bolder text */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="name"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-heading mb-1">I am a...</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              // Select box ki styling ko Input component jaisa banaya
              className="mt-1 block w-full rounded-lg border-light-gray shadow-sm focus:border-primary focus:ring-primary sm:text-base px-4 py-2.5 transition-all duration-200"
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>
          <Button type="submit" variant="primary" className="w-full text-lg py-3.5" disabled={loading}> {/* Bigger button */}
            {loading ? <Spinner size="sm" /> : 'Create Account'} {/* Spinner use kiya */}
          </Button>
        </form>
         <p className="mt-6 text-center text-base text-body"> {/* Font size update kiya */}
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline hover:text-primary-dark transition-colors duration-200">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
