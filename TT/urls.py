from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('pages.urls', 'pages'), namespace='pages')),
    path('articles/', include(('articles.urls', 'articles'), namespace='articles')),
    path('accounts/', include(('django.contrib.auth.urls', 'accounts'), namespace='accounts')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
