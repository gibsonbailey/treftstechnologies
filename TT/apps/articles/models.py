from django.db import models
from django.utils import timezone

class ArticleModel(models.Model):
    title = models.CharField(max_length=100)
    abstract = models.TextField()
    thumbnail = models.ImageField(upload_to='article_thumbnails/')
    publish_date = models.DateTimeField(default=timezone.now)
    content_template_name = models.CharField(max_length=100, default='blog_template')

