from django.urls import path

from . import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
    path('webgl', views.WebGLCubeView.as_view(), name='webglcube'),
]
