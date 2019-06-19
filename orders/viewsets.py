"""Viewsets for orders app."""

from rest_framework import viewsets

from . import models
from . import serializers


class WorkOrderViewSet(viewsets.ModelViewSet):
    """Viewset for OrderSerializer."""

    queryset = models.WorkOrder.objects.all()
    serializer_class = serializers.WorkOrderSerializer
