from django.db import models
from django.utils import timezone
from django.utils.text import slugify

class Article(models.Model):
    title = models.CharField(max_length=100)
    abstract = models.TextField()
    thumbnail = models.ImageField(upload_to='article_thumbnails/')
    publish_date = models.DateTimeField(default=timezone.now)
    published = models.BooleanField(default=False)
    slug = models.SlugField(default='article')
    content_template_url = models.CharField(max_length=100, default='article_template')

    def save(self, **kwargs):
        self.slug = slugify(self.title + " " + str(self.pk))
        super().save(**kwargs)

    def __str__(self):
        return self.title





