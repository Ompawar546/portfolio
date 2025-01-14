import React, { useState } from 'react';
import { MenuIcon, XIcon, GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import Hero from './Hero';
import Projects from './Projects';
import Skills from './Skills';
import FeedBack from './FeedBack';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-extrabold text-blue-600">Om Pawar</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-500 font-medium transition">Home</a>
              <a href="#projects" className="text-gray-700 hover:text-blue-500 font-medium transition">Projects</a>
              <a href="#skills" className="text-gray-700 hover:text-blue-500 font-medium transition">Skills</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-500 font-medium transition">Contact</a>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-500 focus:outline-none"
              >
                {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a href="#home" className="block text-gray-700 hover:text-blue-500 font-medium">Home</a>
              <a href="#projects" className="block text-gray-700 hover:text-blue-500 font-medium">Projects</a>
              <a href="#skills" className="block text-gray-700 hover:text-blue-500 font-medium">Skills</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-500 font-medium">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Sections */}
      <Hero />
      <Projects />
      <Skills />
      <FeedBack />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>&copy; 2025 Om Pawar. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={24} className="text-gray-400 hover:text-white transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={24} className="text-gray-400 hover:text-white transition" />
            </a>
            <a href="mailto:om.pawar@example.com">
              <MailIcon size={24} className="text-gray-400 hover:text-white transition" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
