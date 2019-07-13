from django.contrib.auth import get_user_model
from rest_framework import serializers

from articles.models import Article, Comment
from profiles.serializers import UserSerializer


User = get_user_model()

class InstanceOutPKInField(serializers.PrimaryKeyRelatedField):
    def __init__(self, *args, **kwargs):
        self.model = kwargs.pop('model')
        self.model_serializer = kwargs.pop('model_serializer')
        super().__init__(*args, **kwargs)

    def to_representation(self, value):
        pk = super(InstanceOutPKInField, self).to_representation(value)
        try:
            item = self.model.objects.get(pk=pk)
            serializer = self.model_serializer(item)
            return serializer.data
        except self.model.DoesNotExist:
            return None


class CommentSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all(), write_only=False, allow_null=True)
    author = InstanceOutPKInField(queryset=User.objects.all(), write_only=False, allow_null=False, model=User, model_serializer=UserSerializer)
    article = serializers.PrimaryKeyRelatedField(queryset=Article.objects.all(), write_only=False, allow_null=False)

    class Meta:
        model = Comment
        fields = ('pk', 'article', 'author', 'date_created', 'text', 'replies', 'parent','article_id', 'author_id', 'parent_id')
        depth = 3
        read_only_fields = ('pk', 'date_created', 'replies', 'author', 'parent', 'article')

    def create(self, validated_data):
        print(validated_data)

        comment = Comment.objects.create(**validated_data)
##        comment.save()
        return comment
#        try:
#            parent_pk = validated_data.pop('parent_pk')
#            article_pk = validated_data.pop('article_pk')
#            author_pk = validated_data.pop('author_pk')
#            parent = Comment.objects.get(pk=parent_pk)
#            article = Article.objects.get(pk=article_pk)
#            author = User.objects.get(pk=author_pk)
#            comment = Comment.objects.create(**validated_data)
#        except Exception as e:
#            print(e)
#        return 0
##        comment = Comment.objects.create(**validated_data)
#        print(validated_data)
#        print(comment)
#        print(comment.parent)
#        print(comment.author)
#        print(comment.article)
