from TT.settings.base import *


DEBUG = True
ALLOWED_HOSTS = ['*']

BUILT_JS = False
TEMPLATES[0]['OPTIONS']['context_processors'].append('pages.context_processors.built_js')


CORS_REPLACE_HTTPS_REFERER      = False
HOST_SCHEME                     = "http://"
SECURE_PROXY_SSL_HEADER         = None
SECURE_SSL_REDIRECT             = False
SESSION_COOKIE_SECURE           = False
CSRF_COOKIE_SECURE              = False
SECURE_HSTS_SECONDS             = None
SECURE_HSTS_INCLUDE_SUBDOMAINS  = False
SECURE_FRAME_DENY               = False