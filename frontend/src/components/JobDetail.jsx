import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import jobService from '../services/jobService';

function JobDetail() {
  const { id } = useParams(); // Get job ID from the URL
  const navigate = useNavigate(); // For programmatic navigation

  // State for storing job data, loading status, errors, and user feedback messages
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Fetch job details on mount or when 'id' changes
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobService.getJobById(id); // Fetch job by ID from backend
        setJob(response.data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Job not found or an error occurred.');
      } finally {
        setLoading(false); // Stop loading spinner once done
      }
    };

    fetchJob();
  }, [id]);

  // Soft delete (deactivate) the job
  const handleSoftDelete = async () => {
    if (window.confirm('Are you sure you want to deactivate this job?')) {
      try {
        await jobService.softDeleteJob(id);
        setMessage('Job deactivated successfully!');
        setMessageType('success');
        setTimeout(() => {
          setMessage('');
          navigate('/'); // Redirect back to homepage after deactivation
        }, 1500);
      } catch (err) {
        console.error('Error deactivating job:', err);
        setMessage('Failed to deactivate job.');
        setMessageType('error');
      }
    }
  };

  // Loading indicator while fetching job
  if (loading) {
    return <div className="text-center text-lg mt-8">Loading job details...</div>;
  }

  // Display error if fetching failed
  if (error) {
    return <div className="text-center text-lg mt-8 text-red-600">{error}</div>;
  }

  // Fallback if no job is found (unlikely but defensive)
  if (!job) {
    return <div className="text-center text-lg mt-8">No job found.</div>;
  }

  // Set status color badge based on active/inactive
  const statusColor = job.status === 'active'
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-600">
      
      {/* Display success/error message */}
      {message && (
        <div className={`p-4 mb-4 rounded-lg text-white ${
          messageType === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {message}
        </div>
      )}

      {/* Job header with title and status badge */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
          {job.title}
        </h1>
        <span className={`px-4 py-1 text-sm font-semibold rounded-full ${statusColor}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>

      {/* Company and location */}
      <p className="text-2xl text-gray-800 mb-2">
        <span className="font-semibold">{job.company_name}</span> - {job.location}
      </p>

      {/* Salary display */}
      <p className="text-3xl font-extrabold text-green-700 mb-6">
        ${job.salary.toLocaleString()}
        <span className="text-lg font-medium text-gray-500"> / year</span>
      </p>

      {/* Job description */}
      <div className="prose max-w-none text-gray-700 mb-8 leading-relaxed">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Job Description</h3>
        <p>{job.description}</p>
      </div>

      {/* Timestamps */}
      <div className="text-gray-500 text-sm mb-8">
        <p>Posted: {new Date(job.created_at).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(job.updated_at).toLocaleDateString()}</p>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-4">
        {/* Edit Button */}
        <Link
          to={`/jobs/${job.id}/edit`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md"
        >
          Edit Job
        </Link>

        {/* Deactivate Button (only if job is active) */}
        {job.status === 'active' && (
          <button
            onClick={handleSoftDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md"
          >
            Deactivate Job
          </button>
        )}

        {/* Back to Listings Button */}
        <Link
          to="/"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md"
        >
          Back to Listings
        </Link>
      </div>
    </div>
  );
}

export default JobDetail;
