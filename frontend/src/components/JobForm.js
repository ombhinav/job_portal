import React, { useState } from 'react';
import { createJob } from '../api';

const JobForm = ({ onJobAdded }) => {
  const [jobData, setJobData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    link: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const newJob = await createJob(jobData);
      setJobData({
        company: '',
        role: '',
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        link: '',
      });
      onJobAdded(newJob);
    } catch (err) {
      setError('Failed to add job application');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h2 className="card-title mb-0">Add New Job Application</h2>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="company" className="form-label">Company *</label>
            <input
              type="text"
              className="form-control"
              id="company"
              name="company"
              value={jobData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role *</label>
            <input
              type="text"
              className="form-control"
              id="role"
              name="role"
              value={jobData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={jobData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="appliedDate" className="form-label">Date of Application</label>
            <input
              type="date"
              className="form-control"
              id="appliedDate"
              name="appliedDate"
              value={jobData.appliedDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="link" className="form-label">Link</label>
            <input
              type="url"
              className="form-control"
              id="link"
              name="link"
              value={jobData.link}
              onChange={handleChange}
              placeholder="https://example.com/job"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Job Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;