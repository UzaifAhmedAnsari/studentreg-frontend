// src/components/layout/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-dark-mode-bg text-gray-300 py-10 mt-16 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-3xl font-extrabold text-white mb-4">StudentReg</p>
        <div className="flex justify-center space-x-8 mb-6">
          <a href="#" className="hover:text-primary-light transition-colors duration-200 text-lg font-medium">
            About Us
          </a>
          <a href="#" className="hover:text-primary-light transition-colors duration-200 text-lg font-medium">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary-light transition-colors duration-200 text-lg font-medium">
            Terms of Service
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} StudentReg. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
