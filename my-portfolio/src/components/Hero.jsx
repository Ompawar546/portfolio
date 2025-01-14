import React from 'react'
import { MenuIcon, XIcon, GithubIcon, LinkedinIcon, MailIcon, ExternalLinkIcon } from 'lucide-react';
import axios from 'axios';


const Hero = () => {
  return (
    <div>
        <section id="home" className="pt-20 md:pt-32 pb-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Hi, I'm <span className="text-blue-600">Om Pawar</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Full Stack Developer | MERN Specialist
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <GithubIcon size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <LinkedinIcon size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <MailIcon size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
