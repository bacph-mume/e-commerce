from django.urls import path
from user import views


urlpatterns = [
    path("", views.UserListView.as_view()),
    path("signup/", views.UserCreateView.as_view()),
    path("logout/", views.LogoutView.as_view())
]
