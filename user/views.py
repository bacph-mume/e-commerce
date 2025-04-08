from django.shortcuts import render
from rest_framework import generics
from user.models import User
from user.serializers import UserSerializer

# Create your views here.


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None
