from django.views.generic import TemplateView
from django.conf import settings

from profiles.forms import TTUserCreationForm
from articles.models import Article


class HomePageView(TemplateView):
    template_name = 'pages/home.html'

    def get_context_data(self, **kwargs):
        registration_form = TTUserCreationForm()

        data = super().get_context_data(**kwargs)
        data['home_nav'] = True
        data['page_title'] = 'Home'
        data['registration_form'] = registration_form
        data['perlin_noise_article'] = Article.objects.filter(title__contains='Perlin').first()
        return data


class WebGLCubeView(TemplateView):
    template_name = 'pages/waves.html'

