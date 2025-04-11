const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');

// @desc    Get all job applications
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const { status, sortBy } = req.query;
  let query = {};
  
  // Filter by status if provided
  if (status) {
    query.status = status;
  }
  
  // Handle sorting
  let sortOptions = {};
  if (sortBy === 'date') {
    sortOptions.appliedDate = -1; // Sort by date descending (newest first)
  } else {
    sortOptions.createdAt = -1; // Default sort by creation date
  }
  
  const jobs = await Job.find(query).sort(sortOptions);
  res.json(jobs);
});

// @desc    Create a job application
// @route   POST /api/jobs
// @access  Public
const createJob = asyncHandler(async (req, res) => {
  const { company, role, status, appliedDate, link } = req.body;

  if (!company || !role) {
    res.status(400);
    throw new Error('Please provide company and role');
  }

  const job = await Job.create({
    company,
    role,
    status,
    appliedDate: appliedDate || Date.now(),
    link,
  });

  res.status(201).json(job);
});

// @desc    Update a job application
// @route   PUT /api/jobs/:id
// @access  Public
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedJob);
});

// @desc    Delete a job application
// @route   DELETE /api/jobs/:id
// @access  Public
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  await job.deleteOne();
  res.json({ id: req.params.id });
});

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};