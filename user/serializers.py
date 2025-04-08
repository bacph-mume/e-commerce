
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # exclude = ("password", "user_permissions")
        fields = ["username", "email", "first_name", "last_name", 'orders']
