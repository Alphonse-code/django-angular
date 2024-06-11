from django.db import models
from django.core.validators import validate_email
from django.contrib.auth.hashers import make_password

class User(models.Model):
    name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        self.full_clean()
        super().save(*args, **kwargs)

    def clean(self):
        validate_email(self.email)
        super().clean()