
import React from 'react';
import { ArrowLeft, Edit, Trash2, Building2, MapPin, DollarSign, Calendar, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

interface JobDetailProps {
  job: Job;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onClose, onEdit, onDelete }) => {
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={onClose} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600">Job Details</p>
            </div>
            <Badge variant={job.status === 'active' ? 'default' : 'secondary'} className="text-lg px-3 py-1">
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Overview */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Job Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Job
                    </Button>
                    {job.status === 'active' && (
                      <Button
                        onClick={onDelete}
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Deactivate Job
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Job Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Company</p>
                      <p className="text-gray-600">{job.company_name}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{job.location}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Annual Salary</p>
                      <p className="text-green-600 font-semibold text-lg">
                        {formatSalary(job.salary)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Created</p>
                      <p className="text-gray-600 text-sm">{formatDate(job.created_at)}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-gray-600 text-sm">{formatDate(job.updated_at)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job ID */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-medium mb-1">Job ID</p>
                    <p className="text-gray-600 font-mono text-sm">{job.id}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
