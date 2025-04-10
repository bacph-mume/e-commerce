from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Cart, CartItem
from .serializers import CartCreateSerializer, CartItemCreateSerializer, CartSerializer

# Create your views here.


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({'detail': 'Cart does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CartCreateSerializer(instance=cart, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def _get_cart_and_data(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartItemCreateSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.validated_data["product"]
            quantity = serializer.validated_data["quantity"]
            return cart, product, quantity
        return None, None, None

    def post(self, request):
        cart, product, quantity = self._get_cart_and_data(request)
        if cart is None:
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            item = CartItem.objects.get(cart=cart, product=product)
            item.quantity += quantity
            item.save()
        except CartItem.DoesNotExist:
            if quantity > 0:
                CartItem.objects.create(
                    cart=cart, product=product, quantity=quantity)
        return Response({"message": "Cart updated successfully"}, status=status.HTTP_200_OK)
