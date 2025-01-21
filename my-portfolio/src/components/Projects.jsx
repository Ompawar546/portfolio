import React from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';

const projects = [
    {
      title: "PREP-AHEAD",
      description: "A MERN Stack web application for full job preparation like personalized assessment test, AI mock interview, Course recommendation, Job recommendation.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "https://prepahead-mern-project.onrender.com/",
      image: "/api/placeholder/600/400"
    },
    {
      title: "A SOCIAL MEDIA WEB-APPLICATION",
      description: "The platform enables users to create accounts, manage profiles, share posts, likes on content. It features secure user authentication, real-time updates, and media upload functionality.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
      image: "/api/placeholder/600/400"
    },
    {
      title: "MOVIE RECOMMENDATION SYSTEM",
      description: "The application leverages machine learning algorithms like collaborative filtering and content-based filtering to provide personalized movie recommendations. Users can search for movies, view details, and receive suggestions based on their preferences and viewing history.",
      tags: ["Python", "Flask/Django", "Pandas", "Numpy", "Matplotlib"],
      link: "#",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Portfolio",
      description: "A sleek and modern freelancing portfolio website showcasing my skills, projects, and professional journey. Designed to highlight expertise, attract clients, and build lasting connections through a user-friendly interface and engaging content.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
      image: "/api/placeholder/600/400"
    }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore some of my recent work and technical achievements
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-t-xl">
              
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a 
                    href={project.link}
                    className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"
                  >
                    View Project
                    <ExternalLinkIcon size={18} />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-blue-50 text-blue-600 text-sm px-4 py-1.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a 
                    href={project.link}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 group"
                  >
                    Open
                    <ExternalLinkIcon size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <GithubIcon size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;