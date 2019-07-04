from django.db import models
from django.contrib.auth.models import AbstractUser

class TTUser(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    portrait = models.ImageField(upload_to='profile_pictures/')

    def __str__(self):
        return self.username
