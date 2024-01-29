from django.db import models

# Create your models here.
class User (models.Model):
    name = models.CharField(max_length=100, null=True)
    email = models.EmailField(null=True)
    password = models.CharField(max_length=100, null=True)
    imagepath = models.TextField(null=True)
    gender = models.CharField(max_length=40, null=True)
    nationality = models.CharField(max_length=50, null=True)
    profession = models.CharField(max_length=50, null=True)
    educationLevel = models.CharField(max_length=50, null=True)
    socialism = models.TextField(max_length=800, null=True)
    description = models.TextField(max_length=500, null=True)
    def _str_(self):
        return f"{self.name}{self.email}{self.gender}"
    
