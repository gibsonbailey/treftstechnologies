from django.views.generic import TemplateView
from django.contrib.auth.form import UserCreationForm

class HomePageView(TemplateView):
    template_name = 'pages/home.html'

    def get_context_data(self, **kwargs):

        registration_form = UserCreationForm()

        data = super().get_context_data(**kwargs)
        data['home_nav'] = True
        data['page_title'] = 'Home'
        data['registration_form'] = registration_form
        return data

