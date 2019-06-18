"""Models for orders app."""

from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import m2m_changed


class WorkOrder(models.Model):
    """Model for WorkOrder."""

    workers = models.ForeignKey(
        'workers.Worker', on_delete=models.SET_NULL, null=True,
        related_name='workorders', related_query_name='workorder')
    title = models.CharField(max_length=250, blank=False)
    description = models.TextField(blank=False)
    deadline = models.DateField(blank=False)
