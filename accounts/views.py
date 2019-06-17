"""Views for accounts app."""

from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import TemplateView

from allauth.account.views import LoginView
from allauth.account.views import SignupView


class CustomUserLoginView(LoginView):
    """Custom View for user login."""

    template_name = 'accounts/login.html'
    success_url = reverse_lazy('home')


class CustomUserSignupView(SignupView):
    """Custom View for user signup."""

    template_name = 'accounts/signup.html'
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        """Login user after successful registration."""
        frm = super().form_valid(form)
        user = authenticate(
            username=form.cleaned_data['username'],
            password=form.cleaned_data['password1'])
        login(self.request, user)

        return frm


class HomeTemplateView(LoginRequiredMixin, TemplateView):
    """TemplateView for home page."""

    template_name = 'home.html'
