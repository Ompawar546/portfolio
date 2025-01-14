import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, Plus, Trash2, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Portfolio Data State
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    title: '',
    about: '',
    skills: [],
    projects: []
  });

  // Feedback Data State
  const [feedbacks, setFeedbacks] = useState([]);

  // New Skill Input State
  const [newSkill, setNewSkill] = useState('');
  
  // New Project State
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tags: '',
    link: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      
      // Fetch portfolio data
      const portfolioResponse = await axios.get('https://oms-portfolio-19lv.onrender.com/api/admin/portfolio', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Fetch feedback data
      const feedbackResponse = await axios.get('https://oms-portfolio-19lv.onrender.com/api/admin/feedback', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const defaultData = {
        name: '',
        title: '',
        about: '',
        skills: [],
        projects: []
      };
  
      setPortfolioData({
        ...defaultData,
        ...portfolioResponse.data
      });
      
      setFeedbacks(feedbackResponse.data || []);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching data:', err);
      if (err.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e) => {
    setPortfolioData({
      ...portfolioData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setPortfolioData({
        ...portfolioData,
        skills: [...portfolioData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setPortfolioData({
      ...portfolioData,
      skills: portfolioData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      setPortfolioData({
        ...portfolioData,
        projects: [...portfolioData.projects, {
          ...newProject,
          tags: newProject.tags.split(',').map(tag => tag.trim())
        }]
      });
      setNewProject({
        title: '',
        description: '',
        tags: '',
        link: ''
      });
    }
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects
    });
  };

  const handleSavePortfolio = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        'https://oms-portfolio-19lv.onrender.com/api/admin/portfolio',
        portfolioData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Portfolio updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update portfolio. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Messages */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Profile & Projects
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`${
                activeTab === 'feedback'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Feedback
            </button>
          </nav>
        </div>

        {/* Profile & Projects Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={portfolioData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={portfolioData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">About</label>
                  <textarea
                    name="about"
                    value={portfolioData.about}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="space-y-2">
                <ul className="list-disc pl-5">
                {(portfolioData?.skills || []).map((skill, index) => (
  <li key={index} className="flex justify-between items-center">
    <span>{skill}</span>
    <button
      onClick={() => handleRemoveSkill(skill)}
      className="text-red-600 hover:text-red-800"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </li>
))}
                </ul>
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Add new skill"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              <div className="space-y-4">
              {(portfolioData?.projects || []).map((project, index) => (
  <div
    key={index}
    className="border rounded-lg p-4 shadow-sm flex justify-between items-center"
  >
    
<div>
<h3 className="text-lg font-medium">{project.title}</h3>
<p className="text-sm text-gray-600">{project.description}</p>
<p className="text-sm text-gray-500">
  Tags: {project.tags.join(', ')}
</p>
<a
  href={project.link}
  className="text-blue-500 hover:underline"
  target="_blank"
  rel="noopener noreferrer"
>
  View Project
</a>
</div>
<button
onClick={() => handleRemoveProject(index)}
className="text-red-600 hover:text-red-800"
>
<Trash2 className="w-5 h-5" />
</button>
  </div>
))}

                {/* Add New Project */}
                <div className="space-y-2 mt-4">
                  <h3 className="text-lg font-medium">Add New Project</h3>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Project Title"
                  />
                  <textarea
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({ ...newProject, description: e.target.value })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Project Description"
                    rows={3}
                  />
                  <input
                    type="text"
                    value={newProject.tags}
                    onChange={(e) =>
                      setNewProject({ ...newProject, tags: e.target.value })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tags (comma separated)"
                  />
                  <input
                    type="text"
                    value={newProject.link}
                    onChange={(e) =>
                      setNewProject({ ...newProject, link: e.target.value })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Project Link"
                  />
                  <button
                    onClick={handleAddProject}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={handleSavePortfolio}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                <Save className="w-4 h-4 inline-block mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">User Feedback</h2>
            <ul className="space-y-4">
            {(feedbacks || []).map((feedback, index) => (
  <li key={index} className="bg-white shadow rounded-lg p-4">
                        <p className="text-gray-700">{feedback.message}</p>
                  <p className="text-sm text-gray-500">
                    - {feedback.user}, {new Date(feedback.date).toLocaleDateString()}
                  </p>
  </li>
))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

