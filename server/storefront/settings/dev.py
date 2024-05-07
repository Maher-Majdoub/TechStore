from datetime import timedelta
from .common import *


DEBUG = True

SECRET_KEY = 'django-insecure-fj&thtuv-zfcs0s^+l+vs=cxk0zo3wu9*y+tn+4h3o0j@+9ov*'

MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')

INSTALLED_APPS += [
    'debug_toolbar',
]


# DATA_BASE_URL = os.environ['DATA_BASE_URL']
# DATABASES = {'default': dj_database_url.parse(DATA_BASE_URL)}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'techstore',
        'HOST': 'localhost',
        'USER': 'root',
        'PASSWORD': 'maher'
    }
}

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'localhost'
# EMAIL_HOST_USER = ''
# EMAIL_HOST_PASSWORD = ''

EMAIL_PORT = 2525
DEFAULT_FROM_EMAIL = 'from@maherbuy.com'

ADMINS = [
    ('Maher', 'admin@maherbuy.com'),
]

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES' : ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(weeks=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(weeks=1),
}

CELERY_BROKER_URL = 'redis://localhost:6379/1'