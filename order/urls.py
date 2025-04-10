from django.urls import path
from order import views
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("", views.OrderView.as_view(), name="order"),
    path("<uuid:order_id>/", views.OrderDetailView.as_view(), name="order_detail"),
]

# router = DefaultRouter()
# router.register("", views.OrderViewSet)

# urlpatterns += router.urls
