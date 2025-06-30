// src/layouts/RootLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-inter antialiased">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10 md:py-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
