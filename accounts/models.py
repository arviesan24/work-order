"""Models for accounts app."""

from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
