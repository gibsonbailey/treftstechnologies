import json

from django.views.generic.detail import DetailView
from django.views.generic import CreateView
from django.shortcuts import redirect
from django.http import Http404
from django.contrib import messages

from .forms import TTUserCreationForm
from .models import TTUser


class ProfileDetailView(DetailView):
    model = TTUser
    template_name = 'profiles/detail.html'

class RegisterView(CreateView):
    form_class = TTUserCreationForm
    template_name = 'pages/home.html'


def RegisterView(request):
    if request.method == 'POST':
        form = TTUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
        else:
            errors = form.error_messages
            print(json.dumps(dict(form.error_messages)))
            print(type(json.dumps(dict(form.error_messages))))
            request.session['invalid_form'] = '2'#json.dumps(dict(form.error_messages))
            print(errors)
            print(dict(errors))
            return redirect('/')
    else:
        raise Http404()