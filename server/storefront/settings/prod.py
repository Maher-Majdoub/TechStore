from datetime import timedelta
from .common import *
import dj_database_url
import os

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = ["*"]

DATA_BASE_URL = os.environ['DATA_BASE_URL']
DATABASES = {'default': dj_database_url.parse(DATA_BASE_URL)}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES' : ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=24),
}

