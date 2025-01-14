import React from 'react';
import { Code, Server, Database, Layout, GitBranch, Terminal } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Layout className="w-6 h-6" />,
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "TypeScript", level: 75 }
    ]
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "REST APIs", level: 85 }
    ]
  },
  {
    title: "Database",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "MongoDB", level: 85 }
    ]
  },
  {
    title: "Tools & Version Control",
    icon: <GitBranch className="w-6 h-6" />,
    skills: [
      { name: "Git", level: 90 }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of my technical expertise and professional capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-gray-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform origin-left transition-transform duration-1000"
                          style={{ 
                            width: `${skill.level}%`,
                            animation: `slideRight 1.5s ease-out ${skillIndex * 0.2}s` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">
            Additional technologies and tools I work with
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Next.js", "Redux", "TailwindCSS", "AWS"].map((tool, index) => (
              <div 
                key={index}
                className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <span className="text-gray-700">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;