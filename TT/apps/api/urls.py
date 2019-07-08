from django.urls import path, include

from api.views import CommentList

urlpatterns = [
    path('comments/<int:pk>/', CommentList.as_view()),

    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
]
