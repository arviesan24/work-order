"""Views for accounts app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import TemplateView

from allauth.account.views import LoginView
from allauth.account.views import SignupView


class CustomUserLoginView(LoginView):
    """Custom View for user login."""

    template_name = 'accounts/login.html'
    success_url = reverse_lazy('home')


class HomeTemplateView(LoginRequiredMixin, TemplateView):
    """TemplateView for home page."""

    template_name = 'home.html'
