import axios from 'axios';
const API_BASE_URL = ' ';// Define the base URL for the API

const jobService = {
  // Fetch all jobs
  getAllJobs: () =>{
    return axios.get('API_BASE_URL')
  },
    // Fetch a job by ID
    getJobId: (id) => {
        return axios.get(`${API_BASE_URL}/${id}`)
    },
    // Create a new job
    createJob: (jobData) => {
        return axios.post('API_BASE_URL', jobData)
    },
    // Update a job by ID
    updateJob: (id, jobData) => {
        return axios.put(`${API_BASE_URL}/${id}`, jobData)
    },
    // Delete a job by ID
    SoftDeleteJob: (id) => {
        return axios.patch(`${API_BASE_URL}/${id}`)
    },
};

export default jobService;