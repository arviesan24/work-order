"""Serializers for orders app."""

from rest_framework import serializers

from . import models


class WorkOrderSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer for Order model."""

    class Meta:
        model = models.Order
        fields = ['url', 'id', 'workers', 'title', 'description', 'deadline']
