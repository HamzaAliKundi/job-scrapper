const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobDetailPage: String,
    jobTitle: String,
    company: String,
    location: String,
    description: String,
    website: {
      type: String,
      default: 'https://www.indeed.com',
    },
  },
  {
    timestamps: true,
  }
);

const JobListing = mongoose.model('job', jobSchema);

module.exports = JobListing;
