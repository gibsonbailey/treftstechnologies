from django.db import models
from django.contrib.auth.models import AbstractUser

class TTUser(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    portrait = models.ImageField(upload_to='profile_pictures/')
    reference = models.CharField(max_length=50, default='User Reference')

    def __str__(self):
        return self.username

    def save(self, **kwargs):
        ref = ""
        if self.first_name:
            ref += self.first_name
            if self.last_name:
                ref += " "
                ref += self.last_name
        else:
            ref = self.username
        self.reference = ref
        super().save(**kwargs)
