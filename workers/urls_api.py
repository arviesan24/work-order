"""Router config for workers app APIs."""

from workorder.urls import router
from . import viewsets


router.register('workers', viewsets.WorkerViewSet)

urlpatterns = []
