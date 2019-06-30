"""Views for workers app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.base import TemplateView


class WorkerTemplateView(LoginRequiredMixin, TemplateView):
    """TemplateView for Worker objects."""

    template_name = 'workers/list.html'
