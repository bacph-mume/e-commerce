
from rest_framework import serializers
from .models import Order, OrderItem
from django.db import transaction


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name")
    product_price = serializers.CharField(source="product.price")

    class Meta:
        model = OrderItem
        fields = ("product_name", "product_price", "quantity", "subtotal")


class OrderCreateSerializer(serializers.ModelSerializer):
    class OrderItemSerializer(serializers.ModelSerializer):
        class Meta:
            model = OrderItem
            fields = ("product", "quantity")
    order_id = serializers.UUIDField(read_only=True)
    items = OrderItemSerializer(many=True)

    def update(self, instance, validated_data):
        order_item_data = validated_data.pop("items")
        with transaction.atomic():
            instance = super().update(instance, validated_data)

            if order_item_data is not None:
                instance.items.all().delete()
                for item in order_item_data:
                    OrderItem.objects.create(order=instance, **item)
        return instance

    def create(self, validated_data):
        orderitem_data = validated_data.pop("items")
        with transaction.atomic():
            order = Order.objects.create(**validated_data)
            for item in orderitem_data:
                OrderItem.objects.create(order=order, **item)

        return order

    class Meta:
        model = Order
        fields = ("order_id", "user", "status", "items")
        extra_kwargs = {
            'user': {'read_only': True},
        }


class OrderSerializer(serializers.ModelSerializer):
    order_id = serializers.UUIDField(read_only=True)
    items = OrderItemSerializer(many=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, obj):
        order_items = obj.items.all()
        return sum(order_item.subtotal for order_item in order_items)

    class Meta:
        model = Order
        fields = ("order_id", "created_at", "user",
                  "status", "items", "total_price")
