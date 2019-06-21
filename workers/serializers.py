"""Serializers for workers app."""

from rest_framework import serializers

from . import models


class WorkerSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer for Worker model."""

    class Meta:
        model = models.Worker
        fields = ['url', 'id', 'name', 'company', 'email']
