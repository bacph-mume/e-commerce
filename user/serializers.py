
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password", "user_permissions")


class UserRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password1", "password2", "email",
                  "first_name", "last_name", "phone", "address", "city", "state")
        # extra_kwargs = {
        #     "email": {"required": True},
        #     "first_name": {"required": True},
        #     "last_name": {"required": True},
        # }

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate(self, data):
        errors = {}
        if data['password1'] != data['password2']:
            errors['password2'] = ["Password does not match"]
            raise serializers.ValidationError(errors)
        return data

    def create(self, validated_data):
        password = validated_data.pop('password1')
        validated_data.pop('password2')
        print(password)
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
