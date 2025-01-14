import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSelection = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  const handleSelection = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);

    if (type === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/portfolio');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to My Portfolio</h1>
        <p className="text-gray-600 text-center mb-8">Please select who you are:</p>
        
        <div className="space-y-4">
          <button
            onClick={() => handleSelection('recruiter')}
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Job Recruiter / Employer
          </button>
          
          <button
            onClick={() => handleSelection('visitor')}
            className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Visitor / Student
          </button>
          
          <button
            onClick={() => handleSelection('admin')}
            className="w-full p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;