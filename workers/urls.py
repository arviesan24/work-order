"""URLs for workers app."""

from django.urls import path


from . import views

urlpatterns = [
    path('list/', views.WorkerTemplateView.as_view(), name='list'),
]
