from django.contrib.staticfiles.templatetags.staticfiles import static
from django.views.generic.base import RedirectView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('', include(('pages.urls', 'pages'), namespace='pages')),
    path('profiles/', include(('profiles.urls', 'profiles'), namespace='profiles')),
    path('articles/', include(('articles.urls', 'articles'), namespace='articles')),
    path('api/v1/', include(('api.urls', 'api'), namespace='api')),

    # Django default
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),

    # Third Party
    path('djga/', include('google_analytics.urls')),

    # Favicon redirect
    path('favicon.ico', RedirectView.as_view(url='/static/icons/favicon.ico')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
