    // src/components/layout/DashboardHeader.jsx
    import useAuth from '../../hooks/useAuth';

    const DashboardHeader = () => {
      const { user } = useAuth();

      return (
        <header className="bg-surface shadow-soft p-6 md:p-8 flex justify-between items-center border-b border-border-light">
          <h1 className="text-3xl font-extrabold text-heading">
            Welcome, {user?.name || 'User'}!
          </h1>
          {/* Aap yahan koi profile dropdown ya notifications add kar sakte hain */}
        </header>
      );
    };

    export default DashboardHeader;
    