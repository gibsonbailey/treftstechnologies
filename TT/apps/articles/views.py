from django.views.generic.list import ListView
from .models import ArticleModel

class ArticleListView(ListView):
    model = ArticleModel
    template_name = 'articles/list.html'
