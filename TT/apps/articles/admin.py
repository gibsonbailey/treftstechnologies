from django.contrib import admin
from .models import Article, Comment, CommentObjection

class CommentAdmin(admin.ModelAdmin):
    list_display = ('article', 'author', '__str__', 'parent', 'pk')

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'author', 'pk')

# Register your models here.
admin.site.register(Article, ArticleAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(CommentObjection)
