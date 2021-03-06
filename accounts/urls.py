"""URLs for workers app."""

from django.urls import path
from django.urls import include

from . import views


urlpatterns = [
    path('login/', views.CustomUserLoginView.as_view(), name='user-login'),
    path('logout/', views.CustomUserLogoutView.as_view(), name='user-logout'),
    path('signup/', views.CustomUserSignupView.as_view(), name='user-signup'),
]
