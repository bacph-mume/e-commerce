from django.urls import path


from cart.views import CartItemCreateView, CartView


urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path("add/", CartItemCreateView.as_view(), name='cart_add'),
]
