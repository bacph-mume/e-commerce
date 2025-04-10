
from order.filters import OrderFilter
from order.models import Order
from order.serializers import OrderCreateSerializer, OrderSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from django_filters.rest_framework import DjangoFilterBackend


# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.prefetch_related("items__product")
#     serializer_class = OrderSerializer
#     permission_classes = [IsAuthenticated]
#     pagination_class = None
#     filterset_class = OrderFilter
#     filter_backends = [DjangoFilterBackend]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

#     def get_serializer_class(self):
#         if self.action == 'create' or self.action == 'update':
#             return OrderCreateSerializer

#         return super().get_serializer_class()

#     def get_queryset(self):
#         qs = super().get_queryset()
#         if not self.request.user.is_staff:
#             qs = qs.filter(user=self.request.user)
#         return qs

class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_staff:
            orders = Order.objects.prefetch_related("items__product").all()
        else:
            orders = Order.objects.prefetch_related(
                "items__product").filter(user=request.user)

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        try:
            if request.user.is_staff:
                order = Order.objects.prefetch_related(
                    "items__product").get(order_id=order_id)
            else:
                order = Order.objects.prefetch_related(
                    "items__product").get(order_id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, order_id):
        try:
            if request.user.is_staff:
                order = Order.objects.get(order_id=order_id)
            else:
                return Response({"error": "You do not have permission to update this order."}, status=status.HTTP_403_FORBIDDEN)
        except Order.DoesNotExist:
            return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderCreateSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, order_id):
        try:
            if request.user.is_staff:
                order = Order.objects.get(order_id=order_id)
            else:
                return Response({"error": "You do not have permission to delete this order."}, status=status.HTTP_403_FORBIDDEN)
        except Order.DoesNotExist:
            return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
