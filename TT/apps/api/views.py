from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404

from articles.serializers import CommentSerializer
from articles.models import Comment


class CommentList(APIView):

    def get(self, request, **kwargs):
        article_pk = self.kwargs.get('pk')
        if article_pk == None or request.user == None:
            raise Http404
        comments = Comment.objects.filter(article__pk=article_pk, parent=None)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
