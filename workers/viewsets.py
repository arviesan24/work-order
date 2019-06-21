"""Viewsets for workers app."""

from rest_framework import viewsets

from . import models
from . import serializers


class WorkerViewSet(viewsets.ModelViewSet):
    """Viewset for WorkerSerializer."""

    queryset = models.Worker.objects.all()
    serializer_class = serializers.WorkerSerializer
