import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jobService from '../services/jobService';

// JobForm handles both job creation and editing based on isEditMode prop
function JobForm({ isEditMode = false }) {
  const navigate = useNavigate(); // For programmatic navigation after submission
  const { id } = useParams(); // Retrieve job ID from URL if in edit mode

  // State to store form input values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_name: '',
    location: '',
    salary: '',
    status: 'active',
  });

  // State for validation errors, user feedback messages, and message type
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // If in edit mode, fetch the job data for pre-filling the form
  useEffect(() => {
    if (isEditMode && id) {
      fetchJobData(id);
    }
  }, [isEditMode, id]);

  // Fetch job details using the job ID for editing
  const fetchJobData = async (jobId) => {
    try {
      const response = await jobService.getJobById(jobId);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching job for edit:', error);
      setMessage('Failed to load job for editing.');
      setMessageType('error');
    }
  };

  // Handle input changes and clear specific errors on input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'salary' ? (value === '' ? '' : parseInt(value)) : value,
    }));

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Validate form data before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required.';
    if (!formData.description.trim()) newErrors.description = 'Job description is required.';
    if (!formData.company_name.trim()) newErrors.company_name = 'Company name is required.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    if (!formData.salary || isNaN(formData.salary) || formData.salary <= 0) {
      newErrors.salary = 'Valid salary is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission for creating or updating a job
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before proceeding
    if (!validateForm()) {
      setMessage('Please correct the errors in the form.');
      setMessageType('error');
      return;
    }

    try {
      if (isEditMode) {
        // Update existing job
        await jobService.updateJob(id, formData);
        setMessage('Job updated successfully!');
        setMessageType('success');
      } else {
        // Create new job
        await jobService.createJob(formData);
        setMessage('Job created successfully!');
        setMessageType('success');
      }

      // Clear message and redirect to home after a short delay
      setTimeout(() => {
        setMessage('');
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error submitting job:', error);
      setMessage('Failed to save job. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-600">
      {/* Form heading */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        {isEditMode ? 'Edit Job Listing' : 'Post a New Job'}
      </h2>

      {/* Success or error message */}
      {message && (
        <div
          className={`p-4 mb-4 rounded-lg text-white ${
            messageType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message}
        </div>
      )}

      {/* Job Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="e.g., Senior Software Engineer"
            required
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            className={`w-full p-3 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Provide a detailed job description..."
            required
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.company_name ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="e.g., Tech Solutions Inc."
            required
          />
          {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="e.g., Nairobi, Kenya or Remote"
            required
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Salary (Annual in USD)
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.salary ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="e.g., 90000"
            min="0"
            required
          />
          {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
        </div>

        {/* Status selection for editing */}
        {isEditMode && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
        >
          {isEditMode ? 'Update Job' : 'Create Job'}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
