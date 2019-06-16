"""Forms for workers app."""

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import UserChangeForm

from . import models


class WorkerCreationForm(UserCreationForm):
    """Custom form for User creation."""

    class Meta(UserCreationForm):
        model = models.Worker
        fields = ('name', 'company', 'email')


class WorkerChangeForm(UserChangeForm):
    """Custom form for updating Users."""

    class Meta:
        model = models.Worker
        fields = ('name', 'company', 'email')
