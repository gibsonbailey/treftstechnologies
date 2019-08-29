from django.views.generic import TemplateView
from django.contrib.messages import get_messages

from profiles.forms import TTUserCreationForm

class HomePageView(TemplateView):
    template_name = 'pages/home.html'

    def get_context_data(self, **kwargs):
        registration_form = TTUserCreationForm()

        data = super().get_context_data(**kwargs)
        data['home_nav'] = True
        data['page_title'] = 'Home'
        data['registration_form'] = registration_form
        return data

class WebGLCubeView(TemplateView):
    template_name = 'pages/webgl_cube.html'

