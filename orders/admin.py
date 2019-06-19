"""Admin for orders app."""

from django.contrib import admin

from . import forms
from . import models


class WorkOrderAdmin(admin.ModelAdmin):
    """Admin for WorkOrder model."""

    form = forms.WorkOrderForm


admin.site.register(models.WorkOrder, WorkOrderAdmin)
