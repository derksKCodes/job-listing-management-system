from django.db import models

# Job model to represent a job listing in the database
class Job(models.Model):
    # Choices for the status field (active or inactive)
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    # Job title (e.g., "Software Engineer")
    title = models.CharField(max_length=255)

    # Job description
    description = models.TextField()

    # Company name posting the job
    company_name = models.CharField(max_length=255)

    # Location of the job (e.g., "Nairobi, Kenya")
    location = models.CharField(max_length=255)

    # Annual salary as an integer
    salary = models.IntegerField()

    # Status indicating if the job is active or inactive
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='active'  # Default to active when created
    )

    # Timestamp automatically set when the job is created
    created_at = models.DateTimeField(auto_now_add=True)

    # Timestamp automatically updated when the job is edited
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # Defines how the job will be displayed in the Django admin and shell
        return self.title

    class Meta:
        # Orders jobs by newest first when querying Job.objects.all()
        ordering = ['-created_at']
        
        db_table = 'jobs'  # Custom table name in the database
