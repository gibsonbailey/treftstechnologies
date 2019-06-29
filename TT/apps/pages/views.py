from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = 'pages/home.html'

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['home_nav'] = True
        return data

