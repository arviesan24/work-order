"""Router config for orders app APIs."""

from workorder.urls import router
from . import viewsets


router.register('work-orders', viewsets.WorkOrderViewSet)

urlpatterns = []
