from django.core.management.base import BaseCommand
from jobs.models import Job

class Command(BaseCommand):
    help = 'Populates the database with sample job listings'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing jobs...')
        Job.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Existing jobs deleted.'))

        jobs_data = [
            {
                'title': 'Full Stack Developer',
                'description': 'We are seeking a talented Full Stack Developer with expertise in Python/Django and React/Node.js to join our dynamic team.',
                'company_name': 'InnovateTech Solutions',
                'location': 'Nairobi, Kenya',
                'salary': 180000,
                'status': 'active'
            },
            {
                'title': 'Senior UI/UX Designer',
                'description': 'Join our creative team to craft intuitive and beautiful user interfaces for our next-gen products. Strong portfolio required.',
                'company_name': 'Creative Hub Africa',
                'location': 'Remote',
                'salary': 120000,
                'status': 'active'
            },
            {
                'title': 'Data Analyst Intern',
                'description': 'An exciting internship opportunity for aspiring data analysts. Learn from industry experts and work on real-world projects.',
                'company_name': 'Analytics Forward',
                'location': 'Meru, Kenya',
                'salary': 30000,
                'status': 'active'
            },
            {
                'title': 'Marketing Manager',
                'description': 'Lead our marketing strategies and campaigns to drive brand awareness and customer acquisition. Experience in digital marketing is a plus.',
                'company_name': 'Global Reach Marketing',
                'location': 'Kampala, Uganda',
                'salary': 100000,
                'status': 'active'
            },
            {
                'title': 'Customer Support Specialist',
                'description': 'Provide excellent customer service and technical support to our users. Strong communication skills are essential.',
                'company_name': 'UserCare Connect',
                'location': 'Kigali, Rwanda',
                'salary': 50000,
                'status': 'active'
            },
            {
                'title': 'Backend Developer (Inactive)',
                'description': 'This is an old listing for a backend developer role that is no longer active.',
                'company_name': 'Old Company Ltd.',
                'location': 'Mombasa, Kenya',
                'salary': 100000,
                'status': 'inactive' # Example of an inactive job
            },
        ]

        for data in jobs_data:
            Job.objects.create(**data)
        self.stdout.write(self.style.SUCCESS('Successfully populated sample jobs.'))