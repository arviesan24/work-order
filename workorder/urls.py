"""workorder URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include
from django.urls import path

from rest_framework import routers

from accounts.views import HomeTemplateView


router = routers.DefaultRouter()

urlpatterns = [
    path('', HomeTemplateView.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('user-accounts/',
        include(('accounts.urls', 'accounts'), namespace='accounts')),
    path('workers/',
        include(('workers.urls', 'workers'), namespace='workers')),

    # rest framework URLs
    path('', include('orders.urls_api')),
    path('', include('workers.urls_api')),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
