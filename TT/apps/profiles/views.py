from django.views.generic.detail import DetailView
from django.contrib.auth.forms import UserCreationForm
from django.http import Http404

from .models import TTUser


class ProfileDetailView(DetailView):
    model = TTUser
    template_name = 'profiles/detail.html'

def RegisterView(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        raise Http404()