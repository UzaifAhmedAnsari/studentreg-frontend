// src/components/layout/Navbar.jsx

import { Link, NavLink } from 'react-router-dom';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-surface shadow-medium py-4 md:py-5 transition-all duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Logo Section */}
        <Link to="/" className="text-3xl font-extrabold text-primary hover:text-primary-dark transition-colors duration-200">
          StudentReg
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {/* Courses Link */}
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `text-body hover:text-primary font-medium text-lg relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Courses
                {isActive && (
                  <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-primary rounded-full"></span>
                )}
              </>
            )}
          </NavLink>

          {/* Pricing Link */}
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `text-body hover:text-primary font-medium text-lg relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Pricing
                {isActive && (
                  <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-primary rounded-full"></span>
                )}
              </>
            )}
          </NavLink>

          {/* Dashboard Link (if logged in) */}
          {user && (user.role === 'Student' || user.role === 'Instructor' || user.role === 'Admin') && (
            <NavLink
              to={`/${user.role.toLowerCase()}/dashboard`}
              className={({ isActive }) =>
                `text-body hover:text-primary font-medium text-lg relative group ${isActive ? 'text-primary' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  Dashboard
                  {isActive && (
                    <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-primary rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Button onClick={logout} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-body hover:text-primary">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;