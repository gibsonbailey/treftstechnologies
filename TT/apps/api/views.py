from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.http import Http404
from django import forms

from smtplib import SMTPAuthenticationError

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status


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
        if article_pk is None or request.user is None:
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
        if request.user == comment.author or request.user.is_superuser:
            comment.delete()
            return Response(data='delete success')
        else:
            return Response(status=403)


class UserViewSet(ModelViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsUserOrReadOnly)


class ContactFormView(APIView):
    def post(self, request, **kwargs):
        email_from = settings.EMAIL_HOST_USER
        name = request.data.get('name')
        if not name:
            return Response('No name.', status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        if not request.data.get('message'):
            return Response('No message.', status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # validate email
        email = request.data.get('email')
        f = forms.EmailField()

        try:
            validated_email = f.clean(email)
        except ValidationError:
            return Response('Invalid email.', status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # forward message to me
        message = f"{request.data.get('message')}\n\nReply To: {validated_email}"
        subject = f'Contact From Home Page from {name}'
        recipient_list = [email_from]
        try:
            send_mail(subject, message, email_from, recipient_list)
        except SMTPAuthenticationError:
            return Response({'AuthenticationError'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Respond with thank you message
        subject = 'Thank you for reaching out!'
        message = f"Hi {name},\n\nI'll get back to you as soon as possible. Thanks again for contacting me.\n\nBest,\nBailey Lind-Trefts"
        recipient_list = [validated_email]
        try:
            send_mail(subject, message, email_from, recipient_list)
        except SMTPAuthenticationError:
            return Response({'AuthenticationError'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'Success posting email'})
