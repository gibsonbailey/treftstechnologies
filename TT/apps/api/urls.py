from rest_framework_swagger.views import get_swagger_view
from rest_framework.routers import SimpleRouter
from django.urls import path, include

from . import views

router = SimpleRouter()
router.register('comments', views.CommentViewSet)
router.register('users', views.UserViewSet, 'users')

print('router', router.urls)

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('', include(router.urls)),
    path('article_comments/<int:pk>/', views.CommentList.as_view()),

    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('', schema_view)
]
