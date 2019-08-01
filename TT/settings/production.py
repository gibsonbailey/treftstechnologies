from TT.settings.base import *


DEBUG = False

ALLOWED_HOSTS = ['*']


BUILT_JS = True
TEMPLATES[0]['OPTIONS']['context_processors'].append('pages.context_processors.built_js')

######################################################################################
##################################   TLS    ##########################################
######################################################################################

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True



######################################################################################
##################################   LOGGING    ######################################
######################################################################################

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'filters': None,
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'django.template': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}
