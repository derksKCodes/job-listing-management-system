from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Job
from .serializers import JobSerializer

from django.http import HttpResponse

def home(request):
    return HttpResponse("Job Listing Management Backend is Running 🚀")

# POST /api/jobs/      (create a new job)
# GET /api/jobs/       (list all active jobs)

class JobListCreateAPIView(generics.ListCreateAPIView):
    queryset = Job.objects.all()  # Base queryset for the view
    serializer_class = JobSerializer  # Serializer to handle serialization/deserialization

    def get_queryset(self):
        """
        Override the default queryset for GET requests to return only active jobs.
        This ensures the job listings page shows only active jobs by default.
        """
        return Job.objects.filter(status='active')

    def perform_create(self, serializer):
        """
        Automatically set the job's status to 'active' if it is not explicitly provided in the request.
        This ensures consistency when creating new jobs.
        """
        if 'status' not in self.request.data:
            serializer.save(status='active')
        else:
            serializer.save()

# GET    /api/jobs/<id>/      (retrieve details of a single job)
# PUT    /api/jobs/<id>/      (update a job's details)

class JobDetailUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Job.objects.all()  # Base queryset including all jobs
    serializer_class = JobSerializer  # Serializer to handle data transformation
    lookup_field = 'id'  # Using 'id' from URL instead of default 'pk' for clarity


# PATCH  /api/jobs/<id>/deactivate/   (soft delete: set status to "inactive")

@api_view(['PATCH'])
def deactivate_job(request, id):
    """
    Soft delete a job by setting its status to 'inactive' without removing it from the database.
    This keeps the job data for potential restoration or audit.
    """
    try:
        # Retrieve the job by ID or return a 404 if not found
        job = Job.objects.get(id=id)
    except Job.DoesNotExist:
        return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

    # Update status to 'inactive' and save
    job.status = 'inactive'
    job.save()

    # Serialize updated job and return in response
    serializer = JobSerializer(job)
    return Response(serializer.data, status=status.HTTP_200_OK)
