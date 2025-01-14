const mongoose = require('mongoose');

const portfolioDataSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  projects: {
    type: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      tags: {
        type: [String],
        default: []
      },
      link: {
        type: String,
        default: ''
      }
    }],
    default: []
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('PortfolioData', portfolioDataSchema);