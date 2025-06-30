// src/pages/public/NotFoundPage.jsx

import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-3xl font-bold text-heading mt-4">Page Not Found</h2>
      <p className="text-lg text-body mt-2">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button variant="primary">Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;