from django.urls import path
from .views import JobListCreateAPIView, JobDetailUpdateAPIView, deactivate_job

urlpatterns = [
    path('jobs/', JobListCreateAPIView.as_view(), name='job-list-create'),
    path('jobs/<int:id>', JobDetailUpdateAPIView.as_view(), name='job-detail-update'),
    path('jobs/<int:id>/deactivate', deactivate_job, name='job-deactivate'),
]