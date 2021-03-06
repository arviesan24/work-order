"""Viewsets for workers app."""

from django_filters import rest_framework as django_filters
from rest_framework import viewsets

from . import models
from . import serializers


class WorkerFilterSet(django_filters.FilterSet):
    """Filterset for WorkerViewSet."""

    class Meta:
        model = models.Worker
        fields = ['name', 'company', 'email']


class WorkerViewSet(viewsets.ModelViewSet):
    """Viewset for WorkerSerializer."""

    queryset = models.Worker.objects.all()
    serializer_class = serializers.WorkerSerializer
    filter_backends = (django_filters.DjangoFilterBackend,)
    filterset_class = WorkerFilterSet
