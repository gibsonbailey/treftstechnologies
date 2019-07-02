from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.http import Http404

from .models import ArticleModel

class ArticleListView(ListView):
    model = ArticleModel
    template_name = 'articles/list.html'
    ordering = '-publish_date'

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ArticleModel.objects.all()
        else:
            return ArticleModel.objects.filter(published=True)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['page_title'] = 'Articles'
        return data


class ArticleDetailView(DetailView):
    model = ArticleModel
    template_name = 'articles/detail.html'

    def get_object(self):
        object = super().get_object()
        if object.published == False and not self.request.user.is_superuser:
            raise Http404()
        return object

