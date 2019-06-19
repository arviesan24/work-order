"""Forms for orders app."""

from django import forms
from django.utils.translation import gettext_lazy as _

from . import models


class WorkOrderForm(forms.ModelForm):
    """Form for WOrkOrder model."""

    def clean(self):
        """Return validated input."""
        super().clean()
        workers = self.cleaned_data.get('workers', [])

        # Raise error if user enters more than 5 workers.
        if len(workers) > 5:
            raise ValidationError(
                _('Only 5 workers are allowed per WorkOrder.'))
