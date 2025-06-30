// src/pages/student/MySubscriptionPage.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const MySubscriptionPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        console.log('FRONTEND DEBUG: Fetching subscription...');
        const { data } = await api.get('/subscriptions/my-subscription');
        setSubscription(data);
        console.log('FRONTEND DEBUG: Subscription fetched successfully:', data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
        toast.error("Failed to fetch subscription details: " + errorMessage); 
        console.error("FRONTEND DEBUG: Error fetching subscription:", error.response?.status, error.response?.data, error); // Detailed error log
        setSubscription({ plan: 'Free', status: 'active', message: 'Default free plan (Error Fallback)' });
      } finally {
        setLoading(false);
      }
    };
    fetchSubscription();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const displaySubscription = subscription || { plan: 'Free', status: 'inactive' };

  return (
    <div>
      <h2 className="text-3xl font-bold text-heading mb-6">My Subscription</h2>
      <Card className="p-8 max-w-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-heading">
            Current Plan: {displaySubscription.plan}
          </h3>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${displaySubscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {displaySubscription.status}
          </span>
        </div>
        <p className="mt-4 text-body">
          Manage your subscription and billing details.
        </p>
        <div className="mt-6">
          <Link to="/pricing">
            <Button variant="primary">Change Plan</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default MySubscriptionPage;
