// Import React, useEffect for lifecycle, and useState for local component state
import React, { useEffect, useState } from 'react';
import '../index.css';

// Import  centralized job service for API calls
import jobService from '../services/jobService';

// Import Link for potential navigation and JobCard for displaying each job
import { Link } from 'react-router-dom';
import JobCard from './JobCard'; // This reusable component renders individual job cards

function JobList() {
  // State to store fetched jobs
  const [jobs, setJobs] = useState([]);

  // State for displaying success or error messages
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Fetch jobs immediately when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch all active jobs from the backend API
  const fetchJobs = async () => {
    try {
      const response = await jobService.getAllJobs();
      setJobs(response.data); // Update jobs state with fetched data
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setMessage('Failed to load jobs. Please try again later.');
      setMessageType('error');
    }
  };

  // Soft delete (deactivate) a job by ID
  const handleSoftDelete = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this job?')) {
      try {
        await jobService.softDeleteJob(id); // Call the API to soft delete
        setJobs(jobs.filter(job => job.id !== id)); // Remove deactivated job from UI immediately:  creates a new array containing only the jobs where id does not match the deleted job's id
        setMessage('Job deactivated successfully!');
        setMessageType('success');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      } catch (error) {
        console.error('Error deactivating job:', error);
        setMessage('Failed to deactivate job.');
        setMessageType('error');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Page Heading */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Active Job Listings
      </h2>

      {/* Success or Error Message Display */}
      {message && (
        <div
          className={`p-4 mb-4 rounded-lg text-white ${
            messageType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message}
        </div>
      )}

      {/* Conditional rendering if there are no active jobs */}
      {!Array.isArray(jobs) || jobs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No active jobs found. Be the first to post!
        </p>
      ) : (
        // Grid displaying all active job cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(jobs) && jobs.map((job) => (
            <JobCard
              key={job.id} // Key for React's list rendering
              job={job} // Pass job data to the card
              onSoftDelete={handleSoftDelete} // Pass handler to allow JobCard to trigger soft delete
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Export the JobList component for routing in App.jsx
export default JobList;
