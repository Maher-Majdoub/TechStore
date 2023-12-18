from django.forms import ModelForm
from .models import User


class CustomUserChangeForm(ModelForm):
    class Meta:
        model = User
        exclude = ['password']