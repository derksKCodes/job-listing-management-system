import React from 'react';
import { Link } from 'react-router-dom';

// JobCard component displays a single job's summary in a styled card
// Props:
// - job: the job object containing its data
// - onSoftDelete: function to call when deactivating the job
function JobCard({ job, onSoftDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border-b-4 border-blue-500">
      
      {/* Job basic info section */}
      <div>
        {/* Job title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
          {job.title}
        </h3>

        {/* Company and location */}
        <p className="text-md text-gray-700 mb-1">
          <span className="font-semibold">{job.company_name}</span> - {job.location}
        </p>

        {/* Salary, formatted with commas */}
        <p className="text-xl font-extrabold text-green-600 mb-4">
          ${job.salary.toLocaleString()}
          <span className="text-sm font-medium text-gray-500"> / year</span>
        </p>

        {/* Job description, clamped to 3 lines */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* Action buttons: View Details, Edit, Deactivate */}
      <div className="flex justify-between items-center mt-4">
        {/* View Details button navigates to job detail page */}
        <Link
          to={`/jobs/${job.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out text-sm"
        >
          View Details
        </Link>

        <div className="flex space-x-2">
          {/* Edit button navigates to edit form */}
          <Link
            to={`/jobs/${job.id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out text-sm"
          >
            Edit
          </Link>

          {/* Deactivate button calls onSoftDelete with the job's id */}
          <button
            onClick={() => onSoftDelete(job.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out text-sm"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
