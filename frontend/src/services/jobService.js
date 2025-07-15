import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/jobs';// Define the base URL for the API

//const API_BASE_URL =  'https://job-management-backend-vi3z.onrender.com/api/jobs'; // Use Vite's env variable 

const jobService = {
    // Fetch all jobs
    getAllJobs: () =>{
        return axios.get(API_BASE_URL)
    },
    // Fetch a job by ID
    getJobId: (id) => {
        return axios.get(`${API_BASE_URL}/${id}/`)
    },
    // Create a new job
    createJob: (jobData) => {
        return axios.post(`${API_BASE_URL}/`, jobData)
    },
    // Update a job by ID
    updateJob: (id, jobData) => {
        return axios.put(`${API_BASE_URL}/${id}/`, jobData)
    },
    // Delete a job by ID
    softDeleteJob: (id) => {
        return axios.patch(`${API_BASE_URL}/${id}/deactivate/`);
    },
};

export default jobService;