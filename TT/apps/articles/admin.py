from django.contrib import admin
from .models import Article, Comment, CommentObjection

class CommentAdmin(admin.ModelAdmin):
    list_display = ('article', 'author', '__str__', 'parent')

# Register your models here.
admin.site.register(Article)
admin.site.register(Comment, CommentAdmin)
admin.site.register(CommentObjection)
