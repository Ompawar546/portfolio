import React, { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle, AlertCircle, User, Mail, Building2, MessageSquare } from 'lucide-react';

const FeedBack = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    company: '',
    feedback: '',
    userType: localStorage.getItem('userType') || 'visitor',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/feedback/submit', feedbackData);
      
      if (response.status === 201) {
        setSubmitSuccess(true);
        setFeedbackData({
          ...feedbackData,
          name: '',
          email: '',
          company: '',
          feedback: '',
        });
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      setSubmitError(error.response?.data?.error || 'Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="feedback" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-100 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I'd love to hear your thoughts and feedback
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 relative">
            {submitSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 rounded-2xl transition-all duration-500">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700">{submitError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={feedbackData.name}
                      onChange={handleInputChange}
                      className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 px-4 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={feedbackData.email}
                      onChange={handleInputChange}
                      className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 px-4 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {feedbackData.userType === 'recruiter' && (
                <div className="relative">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <div className="relative">
                    <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={feedbackData.company}
                      onChange={handleInputChange}
                      className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 px-4 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Message / feedback</label>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-gray-400 absolute left-3 top-4" />
                  <textarea
                    id="feedback"
                    name="feedback"
                    value={feedbackData.feedback}
                    onChange={handleInputChange}
                    rows={4}
                    className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 px-4 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1'
                } text-white py-3 px-6 rounded-lg font-medium transition-all duration-200`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message / feedback
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedBack;