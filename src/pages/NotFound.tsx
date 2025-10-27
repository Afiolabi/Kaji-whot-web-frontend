import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page not found</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center space-x-2 mx-auto"
        >
          <Home className="w-5 h-5" />
          <span>Go Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;