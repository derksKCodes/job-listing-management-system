
import React, { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

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

interface JobFormProps {
  job?: Job;
  onSubmit: (jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: job?.title || '',
    description: job?.description || '',
    company_name: job?.company_name || '',
    location: job?.location || '',
    salary: job?.salary || 0,
    status: job?.status || 'active' as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.salary <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={onCancel} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Job' : 'Create New Job'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Update job information' : 'Add a new job listing'}
              </p>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                Job Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Senior Frontend Developer"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                    placeholder="e.g., TechCorp Solutions"
                    className={errors.company_name ? 'border-red-500' : ''}
                  />
                  {errors.company_name && (
                    <p className="text-red-500 text-sm">{errors.company_name}</p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA or Remote"
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm">{errors.location}</p>
                  )}
                </div>

                {/* Salary */}
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary (USD) *</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleChange('salary', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 120000"
                    className={errors.salary ? 'border-red-500' : ''}
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-sm">{errors.salary}</p>
                  )}
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'active' | 'inactive') => handleChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Provide a detailed job description including responsibilities, requirements, and benefits..."
                    rows={6}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Update Job' : 'Create Job'}
                  </Button>
                  <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
