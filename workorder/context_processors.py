"""Project custom context processors."""

from django.conf import settings
from django.contrib.sites.models import Site


def custom_data(context):
    """Return addional context to templates."""
    current_site = Site.objects.get_current()
    
    return {
        'DEBUG': settings.DEBUG,
        'CURRENT_SITE': current_site.domain,
        'API_ROOT_URL': f'{current_site.domain}/api/'}
