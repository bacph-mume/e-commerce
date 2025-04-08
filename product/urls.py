from django.urls import path
from product import views


urlpatterns = [
    path("", views.ProductListAPIView.as_view()),
    path("<int:product_id>/", views.ProductDetailAPIView.as_view()),

]
