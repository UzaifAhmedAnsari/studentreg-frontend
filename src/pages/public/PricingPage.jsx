// src/pages/public/PricingPage.jsx
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast'; // Correct import for toast
import { useState } from 'react';
import Spinner from '../../components/common/Spinner';

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for API calls

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['Access to 1 course', 'Community support'],
      planId: 'Free',
      isCustom: false,
    },
    {
      name: 'Basic',
      price: '$15',
      features: ['Access to 5 courses', 'Priority support', 'Certificate of completion'],
      planId: 'Basic',
      isCustom: false,
    },
    {
      name: 'Premium',
      price: 'Custom',
      features: ['All courses', 'Dedicated account manager', 'Custom integrations'], // Features thodi clear ki
      planId: 'Premium',
      isCustom: true,
    },
  ];

  const handleChoosePlan = async (planDetails) => {
    if (!user) {
      toast.error('Please login to choose a plan.');
      navigate('/login');
      return;
    }

    if (planDetails.isCustom) {
      // toast.info() ki jagah toast() ya toast.success() use karein
      toast('Opening your email client to contact our sales team.', { icon: '📧' }); // Icon ke saath
      
      // Mailto link open karein
      try {
        window.open('mailto:sales@studentreg.com?subject=Inquiry%20about%20Custom%20Plan', '_blank');
      } catch (e) {
        // Agar browser window.open ko block karta hai to user ko manually email address dikhayein
        toast.error('Could not open email client. Please email us at sales@studentreg.com');
        console.error('Failed to open mailto link:', e);
      }
      return;
    }

    setLoading(true);
    try {
      console.log('FRONTEND DEBUG: Attempting to update plan to:', planDetails.planId);
      const response = await api.put('/subscriptions/update-plan', { plan: planDetails.planId });
      toast.success(response.data.message || `You have successfully subscribed to the ${planDetails.name} plan!`);
      console.log('FRONTEND DEBUG: Plan updated successfully:', response.data);
      navigate('/student/my-subscription'); // User ko My Subscription page par redirect karein
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      toast.error('Failed to update plan: ' + errorMessage);
      console.error("FRONTEND DEBUG: Error updating plan:", error.response?.status, error.response?.data, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-center text-heading mb-4">Pricing Plans</h1>
      <p className="text-center text-body max-w-2xl mx-auto mb-12">
        Choose the plan that's right for you.
      </p>
      {loading && <Spinner />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index} className="p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-heading">{plan.name}</h2>
            <p className="text-3xl font-bold my-4">{plan.price}</p>
            <ul className="space-y-3 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button 
                variant="primary" 
                className="w-full text-lg" 
                onClick={() => handleChoosePlan(plan)}
                disabled={loading}
              >
                {plan.isCustom ? 'Contact Us' : 'Get Started'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
