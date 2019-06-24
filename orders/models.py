"""Models for orders app."""

from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from workers.models import Worker


class WorkOrder(models.Model):
    """Model for WorkOrder."""

    workers = models.ManyToManyField('workers.Worker')
    title = models.CharField(max_length=250, blank=False)
    description = models.TextField(blank=False)
    deadline = models.DateField(blank=False)


@receiver(m2m_changed, sender=WorkOrder.workers.through)
def prevent_more_than_five_workers(
        action, instance, reverse, pk_set, **kwargs):
    """Signal preventing excessive workers."""
    if action != 'pre_add':
        return

    if not reverse:
        # updating worker to WorkOrder
        workers_count = Worker.objects.filter(
            workorder__id=instance.id).count()
        # add existing workers and user entered workers
        total_workers = workers_count + len(pk_set)

        # raise validation error if total_workers exceeded 5
        if total_workers > 5:
            raise ValidationError(
                _('Only 5 workers are allowed per WorkOrder.'))
