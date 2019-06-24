"""Serializers for orders app."""

from django.utils.translation import gettext_lazy as _

from rest_framework import serializers

from . import models


class WorkOrderSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer for Order model."""

    class Meta:
        model = models.WorkOrder
        fields = ['url', 'id', 'workers', 'title', 'description', 'deadline']
        depth = 1

    def validate_workers(self, value):
        """Return validated `workers` value."""
        workers = value
        # raise validation error if workers are more than 5
        if len(workers) > 5:
            raise serializers.ValidationError(
                _('Only 5 workers are allowed per WorkOrder.'))

        return value
