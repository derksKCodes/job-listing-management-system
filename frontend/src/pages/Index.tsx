
import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, DollarSign, Building2, Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import JobForm from '@/components/JobForm';
import JobDetail from '@/components/JobDetail';

interface Job {
  id: string;
  title: string;
  description: string;
  company_name: string;
  location: string;
  salary: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  // Sample data initialization
  useEffect(() => {
    const sampleJobs: Job[] = [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks.',
        company_name: 'TechCorp Solutions',
        location: 'San Francisco, CA',
        salary: 120000,
        status: 'active',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        title: 'Full Stack Engineer',
        description: 'Join our engineering team to work on cutting-edge projects. Experience with Node.js, Python, and cloud technologies required.',
        company_name: 'Innovation Labs',
        location: 'New York, NY',
        salary: 110000,
        status: 'active',
        created_at: '2024-01-16T14:30:00Z',
        updated_at: '2024-01-16T14:30:00Z',
      },
      {
        id: '3',
        title: 'DevOps Engineer',
        description: 'Seeking a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. AWS and Kubernetes experience preferred.',
        company_name: 'CloudScale Inc',
        location: 'Seattle, WA',
        salary: 130000,
        status: 'active',
        created_at: '2024-01-17T09:15:00Z',
        updated_at: '2024-01-17T09:15:00Z',
      },
      {
        id: '4',
        title: 'UI/UX Designer',
        description: 'Creative UI/UX Designer needed to design intuitive user interfaces and exceptional user experiences for our web and mobile applications.',
        company_name: 'Design Studio Pro',
        location: 'Austin, TX',
        salary: 85000,
        status: 'active',
        created_at: '2024-01-18T11:45:00Z',
        updated_at: '2024-01-18T11:45:00Z',
      },
      {
        id: '5',
        title: 'Data Scientist',
        description: 'Analyze complex datasets and develop machine learning models to drive business insights and decision-making.',
        company_name: 'DataWorks Analytics',
        location: 'Remote',
        salary: 140000,
        status: 'active',
        created_at: '2024-01-19T16:20:00Z',
        updated_at: '2024-01-19T16:20:00Z',
      },
    ];
    setJobs(sampleJobs);
  }, []);

  // Filter jobs based on search and status
  useEffect(() => {
    let filtered = jobs;
    
    if (!showInactive) {
      filtered = filtered.filter(job => job.status === 'active');
    }
    
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredJobs(filtered);
  }, [jobs, searchTerm, showInactive]);

  const handleCreateJob = (jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setJobs(prev => [newJob, ...prev]);
    setShowForm(false);
    toast.success('Job created successfully!');
  };

  const handleUpdateJob = (jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingJob) return;
    
    const updatedJob: Job = {
      ...editingJob,
      ...jobData,
      updated_at: new Date().toISOString(),
    };
    setJobs(prev => prev.map(job => job.id === editingJob.id ? updatedJob : job));
    setEditingJob(null);
    toast.success('Job updated successfully!');
  };

  const handleSoftDelete = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'inactive' as const, updated_at: new Date().toISOString() }
        : job
    ));
    toast.success('Job deactivated successfully!');
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (showForm) {
    return (
      <JobForm
        onSubmit={handleCreateJob}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  if (editingJob) {
    return (
      <JobForm
        job={editingJob}
        onSubmit={handleUpdateJob}
        onCancel={() => setEditingJob(null)}
        isEditing
      />
    );
  }

  if (viewingJob) {
    return (
      <JobDetail
        job={viewingJob}
        onClose={() => setViewingJob(null)}
        onEdit={() => {
          setEditingJob(viewingJob);
          setViewingJob(null);
        }}
        onDelete={() => {
          handleSoftDelete(viewingJob.id);
          setViewingJob(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Management System</h1>
          <p className="text-gray-600">Manage your job listings with ease</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={showInactive ? "default" : "outline"}
              onClick={() => setShowInactive(!showInactive)}
            >
              {showInactive ? 'Show Active Only' : 'Show All Jobs'}
            </Button>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Job
            </Button>
          </div>
        </div>

        {/* Job Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {jobs.filter(job => job.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Jobs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">
                {jobs.filter(job => job.status === 'inactive').length}
              </div>
              <div className="text-sm text-gray-600">Inactive Jobs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {jobs.length}
              </div>
              <div className="text-sm text-gray-600">Total Jobs</div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500 text-lg">No jobs found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or add a new job</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {job.title}
                    </CardTitle>
                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.company_name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">{formatSalary(job.salary)}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs">Created {formatDate(job.created_at)}</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
                  
                  <div className="flex gap-2 pt-3 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewingJob(job)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingJob(job)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {job.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSoftDelete(job.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
