from djoser.serializers import (
        UserSerializer as BaseUserSerializer,
        UserCreateSerializer as BaseUserCreateSerializer
    )


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'email']


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'email', 'username', 'password',]