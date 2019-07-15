from django.contrib.auth import get_user_model

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from django.http import Http404

from articles.serializers import CommentSerializer
from profiles.serializers import UserSerializer
from articles.models import Comment


User = get_user_model()


class IsUserOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, user):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser:
            return True
        return user == request.user



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
    permission_classes = (permissions.AllowAny,)

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

class UserViewSet(ModelViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsUserOrReadOnly)

