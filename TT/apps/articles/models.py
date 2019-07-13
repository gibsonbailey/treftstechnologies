from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.utils import timezone
from django.db import models


User = get_user_model()

class Article(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
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

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', blank=True, null=True)
    date_created = models.DateTimeField(default=timezone.now)
    approved = models.BooleanField(default=True)
    text = models.TextField()
    depth = models.IntegerField(default=0)

    def save(self, **kwargs):
        if self.parent:
            self.depth = self.parent.depth + 1
        super().save(**kwargs)

    def __str__(self):
        return self.text.split(' ')[0]

class CommentObjection(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='objections')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='objections')
    note = models.TextField()
