import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, onJobUpdated, onJobDeleted }) => {
  if (jobs.length === 0) {
    return (
      <div className="alert alert-info">
        No job applications found. Add your first application using the form above!
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobItem 
          key={job._id} 
          job={job} 
          onJobUpdated={onJobUpdated}
          onJobDeleted={onJobDeleted}
        />
      ))}
    </div>
  );
};

export default JobList;