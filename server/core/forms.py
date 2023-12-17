from django.forms import ModelForm
from django.contrib.auth.forms import UserChangeForm
from .models import User


class CustomUserChangeForm(ModelForm):
    class Meta:
        model = User
        exclude = ['password']