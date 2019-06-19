"""Viewsets for orders app."""

from rest_framework import viewsets

from . import models
from . import serializers


class OrderViewSet(viewsets.ModelViewSet):
    """Viewset for OrderSerializer."""

    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
