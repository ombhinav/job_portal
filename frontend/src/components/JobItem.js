import React, { useState } from 'react';
import { updateJob, deleteJob } from '../api';

const JobItem = ({ job, onJobUpdated, onJobDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedJob, setUpdatedJob] = useState({ ...job });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUpdatedJob({
      ...updatedJob,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsLoading(true);
    try {
      const updated = await updateJob(job._id, { 
        ...job, 
        status: newStatus 
      });
      onJobUpdated(updated);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updated = await updateJob(job._id, updatedJob);
      onJobUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update job:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setIsLoading(true);
      try {
        await deleteJob(job._id);
        onJobDeleted(job._id);
      } catch (err) {
        console.error('Failed to delete job:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Applied': return 'bg-info';
      case 'Interview': return 'bg-warning';
      case 'Offer': return 'bg-success';
      case 'Rejected': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card mb-3">
      <div className={`card-header ${getStatusClass(job.status)} text-white d-flex justify-content-between align-items-center`}>
        <div>{job.company} - {job.role}</div>
        <div>
          {!isEditing && (
            <div className="btn-group">
              <button 
                className="btn btn-sm btn-light me-2" 
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm btn-danger" 
                onClick={handleDelete}
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card-body">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor={`company-${job._id}`} className="form-label">Company</label>
              <input
                type="text"
                className="form-control"
                id={`company-${job._id}`}
                name="company"
                value={updatedJob.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`role-${job._id}`} className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                id={`role-${job._id}`}
                name="role"
                value={updatedJob.role}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`status-${job._id}`} className="form-label">Status</label>
              <select
                className="form-select"
                id={`status-${job._id}`}
                name="status"
                value={updatedJob.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor={`appliedDate-${job._id}`} className="form-label">Date of Application</label>
              <input
                type="date"
                className="form-control"
                id={`appliedDate-${job._id}`}
                name="appliedDate"
                value={updatedJob.appliedDate.split('T')[0]}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`link-${job._id}`} className="form-label">Link</label>
              <input
                type="url"
                className="form-control"
                id={`link-${job._id}`}
                name="link"
                value={updatedJob.link}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-2">
              <strong>Status:</strong> 
              <select 
                className="form-select-sm ms-2"
                value={job.status}
                onChange={handleStatusChange}
                disabled={isLoading}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <p className="mb-2"><strong>Applied:</strong> {formatDate(job.appliedDate)}</p>
            {job.link && (
              <p className="mb-0">
                <strong>Link:</strong> <a href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobItem;