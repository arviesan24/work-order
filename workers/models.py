from django.contrib.auth.models import AbstractUser
from django.db import models


class Worker(models.Model):
    """Model for worker."""

    name = models.CharField(max_length=150, blank=False)
    company = models.CharField(max_length=250, blank=False)
    email = models.EmailField(blank=False)
