"""URLs for workers app."""

from django.urls import path
from django.urls import include

from . import views


urlpatterns = [
    path('login/', views.CustomUserLogin.as_view(), name='user-login'),
]
