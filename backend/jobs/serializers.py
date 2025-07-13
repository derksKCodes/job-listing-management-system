from rest_framework import serializers
from .models import Job

# Serializer for the Job model to convert model instances <-> JSON for API requests/responses
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job  # The model this serializer is tied to (our Job model)
        fields = '__all__'  # Include all fields in the Job model automatically

        # These fields are auto-managed by Django and should not be edited directly via the API
        read_only_fields = ('created_at', 'updated_at',)
