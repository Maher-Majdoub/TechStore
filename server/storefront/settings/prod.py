from datetime import timedelta
from .common import *
import dj_database_url
import os

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = ['https://techstore-0gvh.onrender.com']

DATA_BASE_URL = os.environ['DATA_BASE_URL']
DATABASES = {'default': dj_database_url.parse(DATA_BASE_URL)}

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'localhost'
# EMAIL_HOST_USER = ''
# EMAIL_HOST_PASSWORD = ''
# EMAIL_PORT = 2525
# DEFAULT_FROM_EMAIL = 'from@maherbuy.com'

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES' : ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=24),
}

#CELERY_BROKER_URL = 'redis://localhost:6379/1'