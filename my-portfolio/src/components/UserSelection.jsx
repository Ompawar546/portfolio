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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Select your profile to proceed
        </p>
        <div className="space-y-6">
          <button
            onClick={() => handleSelection('recruiter')}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
          >
            Job Recruiter / Employer
          </button>
          <button
            onClick={() => handleSelection('visitor')}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
          >
            Visitor / Student
          </button>
          <button
            onClick={() => handleSelection('admin')}
            className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
