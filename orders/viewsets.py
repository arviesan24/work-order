"""Viewsets for orders app."""

from django_filters import rest_framework as django_filters
from rest_framework import viewsets

from . import models
from . import serializers


class WorkOrderFilterSet(django_filters.FilterSet):
    """Filterset for WorkOrderViewSet."""

    def get_workers_name(self, queryset, name, value):
        """Custom filter for `workers_name`."""
        return queryset.filter(workers__name__icontains=value)

    workers_name = django_filters.CharFilter(method='get_workers_name')

    class Meta:
        model = models.WorkOrder
        fields = [
            'workers', 'workers_name', 'title', 'description', 'deadline']


class WorkOrderViewSet(viewsets.ModelViewSet):
    """Viewset for OrderSerializer."""

    queryset = models.WorkOrder.objects.all().order_by('deadline')
    serializer_class = serializers.WorkOrderSerializer
    filter_backends = (django_filters.DjangoFilterBackend,)
    filterset_class = WorkOrderFilterSet
