from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.http import Http404

from .models import Article


class ArticleListView(ListView):
    model = Article
    template_name = 'articles/list.html'

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Article.objects.all().order_by('-publish_date')
        else:
            return Article.objects.filter(published=True).order_by('-publish_date')

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['page_title'] = 'Articles'
        return data


class ArticleDetailView(DetailView):
    model = Article
    template_name = 'articles/detail.html'

    def get_object(self):
        object = super().get_object()
        self.object = object
        if object.published is False and not self.request.user.is_superuser:
            raise Http404()
        return object

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        article = self.object
        context['next_article'] = Article.objects.filter(publish_date__gt=article.publish_date).order_by('publish_date').first()
        return context
