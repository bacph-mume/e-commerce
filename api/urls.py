from django.urls import path
from api import views
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("products/", views.ProductListAPIView.as_view()),
    path("products/info/", views.ProductInfoAPIView.as_view()),
    path("products/<int:product_id>/", views.ProductDetailAPIView.as_view()),
    path("users/", views.UserListView.as_view()),
]

router = DefaultRouter()
router.register("orders", views.OrderViewSet)

urlpatterns += router.urls
