from rest_framework import serializers

from articles.models import Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('pk', 'article', 'author', 'date_created', 'text', 'replies')
        depth = 3