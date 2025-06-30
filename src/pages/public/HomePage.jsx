// src/pages/public/HomePage.jsx

import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
// lucide-react imports hata diye gaye hain, ab icons inline SVGs hain

// SVG Icons (basic versions)
const BookOpenIcon = ({ size = 28, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const UsersIcon = ({ size = 28, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const AwardIcon = ({ size = 28, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/></svg>
);
// Clipboard icon ki ab zaroorat nahi

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-surface p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">
      <div className="bg-blue-100 text-primary p-3 rounded-full">{icon}</div>
    </div>
    <h3 className="text-xl font-bold text-heading mb-2">{title}</h3>
    <p className="text-body">{children}</p>
  </div>
);

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-extrabold text-heading md:text-6xl">
          Unlock Your Potential
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-body">
          The modern, intuitive, and seamless platform for students and instructors.
          Enroll in courses, manage your learning, and achieve your goals.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/courses">
            <Button variant="primary" className="text-lg px-8 py-3">Browse Courses</Button>
          </Link>
          <Link to="/pricing">
            <Button variant="ghost" className="text-lg px-8 py-3 border border-gray-300">View Pricing</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center text-heading mb-12">Why Choose StudentReg?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={<BookOpenIcon size={28} />} title="Expansive Course Catalog">
            Explore a wide variety of courses taught by expert instructors from around the world.
          </FeatureCard>
          <FeatureCard icon={<UsersIcon size={28} />} title="Flexible Roles">
            Tailored experiences for Students, Instructors, and Administrators for seamless management.
          </FeatureCard>
          <FeatureCard icon={<AwardIcon size={28} />} title="Subscription Tiers">
            Choose a plan that fits your learning needs, from a free start to premium access.
          </FeatureCard>
        </div>
      </section>

{/* Yeh duplicate section tha, isko ab theek kiya gaya hai */}
<div className="grid md:grid-cols-3 gap-8">
  <FeatureCard icon={<UsersIcon />} title="Role-Based Access">
    Three distinct roles with tailored experiences
  </FeatureCard>
  <FeatureCard icon={<BookOpenIcon />} title="Course Management">
    Create and manage courses effortlessly
  </FeatureCard>
  {/* Clipboard icon ko remove kiya gaya hai */}
  <FeatureCard icon={<BookOpenIcon />} title="Student Registration"> {/* Temporary icon BookOpenIcon lagaya */}
    Easy enrollment for students
  </FeatureCard>
</div>

    </div>
  );
};

export default HomePage;
