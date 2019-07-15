from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
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

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        print(comment)
        print(comment.author)
        print(request.user)
        if request.user == comment.author:
            comment.delete()
            return Response(data='delete success')
        else:
            return Response(status=403)

