// Import necessary React and React Router components
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import local components for different views
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import JobDetail from './components/JobDetail';

// Main App component
function App() {
  return (
    // Wrap the entire app with Router for client-side routing
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            
            {/* Logo/Title linked to homepage */}
            <Link to="/" className="text-white text-2xl font-bold tracking-wide">
              Job Board
            </Link>
            
            {/* Link to post a new job */}
            <div>
              <Link
                to="/jobs/new"
                className="bg-white text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-full font-semibold transition duration-300 ease-in-out shadow-lg"
              >
                Post a New Job
              </Link>
            </div>
          </div>
        </nav>

        {/* Main content container */}
        <main className="container mx-auto p-6">
          <Routes>
            {/* Route for homepage showing the list of jobs */}
            <Route path="/" element={<JobList />} />

            {/* Route for creating a new job */}
            <Route path="/jobs/new" element={<JobForm />} />

            {/* Route for viewing details of a specific job */}
            <Route path="/jobs/:id" element={<JobDetail />} />

            {/* Route for editing an existing job */}
            <Route path="/jobs/:id/edit" element={<JobForm isEditMode={true} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Export the App component as default
export default App;
