import React from 'react';

const Filter = ({ onFilterChange, onSortChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="bg-light p-3 mb-4 rounded">
      <div className="row">
        <div className="col-md-6 mb-3 mb-md-0">
          <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
          <select 
            id="statusFilter" 
            className="form-select" 
            onChange={handleStatusChange}
          >
            <option value="">All Applications</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="sortBy" className="form-label">Sort by</label>
          <select 
            id="sortBy" 
            className="form-select" 
            onChange={handleSortChange}
          >
            <option value="date">Date (Newest First)</option>
            <option value="company">Company</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;