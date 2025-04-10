from django.urls import path
from category.views import CategoryAPIView

urlpatterns = [
    path("", CategoryAPIView.as_view())
]
