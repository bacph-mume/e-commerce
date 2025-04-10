from django.urls import path
from product import views


urlpatterns = [
    path("", views.ProductListAPIView.as_view()),
    path("<slug:slug>/", views.ProductDetailAPIView.as_view()),
    path('category/<slug:category_slug>/',
         views.ProductByCategoryAPIView.as_view()),

]
