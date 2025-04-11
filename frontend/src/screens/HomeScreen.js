import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import { fetchJobs } from '../api';

const HomeScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs(filterStatus, sortBy);
      setJobs(data);
      setError('');
    } catch (err) {
      setError('Failed to load job applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [filterStatus, sortBy]);

  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));
  };

  const handleJobDeleted = (deletedJobId) => {
    setJobs(jobs.filter(job => job._id !== deletedJobId));
  };

  return (
    <div>
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <JobForm onJobAdded={handleJobAdded} />
          </div>
          <div className="col-lg-8">
            <Filter 
              onFilterChange={setFilterStatus} 
              onSortChange={setSortBy} 
            />
            
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <JobList 
                jobs={jobs} 
                onJobUpdated={handleJobUpdated}
                onJobDeleted={handleJobDeleted}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;