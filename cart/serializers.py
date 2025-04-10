from rest_framework import serializers
from cart.models import Cart, CartItem
from product.models import Product


class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.CharField(source="product.id")
    product_name = serializers.CharField(source="product.name")
    product_image = serializers.ImageField(source="product.image")
    product_price = serializers.CharField(source="product.price")

    class Meta:
        model = CartItem
        fields = ("product_id", "product_name",
                  "product_price", "product_image", "quantity", "subtotal")


class CartItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ("product", "quantity")


class CartCreateSerializer(serializers.ModelSerializer):
    cart_id = serializers.UUIDField(read_only=True)
    items = CartItemCreateSerializer(many=True)

    def update(self, instance, validated_data):
        cart_item_data = validated_data.pop("items")
        instance = super().update(instance, validated_data)

        exiting_items = {
            item.product.id: item for item in instance.items.all()}

        for item in cart_item_data:
            product = item.get('product')
            quantity = item.get('quantity')
            if product.id in exiting_items:
                exiting_item = exiting_items[product.id]
                if quantity > 0:
                    exiting_item.quantity = quantity
                    exiting_item.save()
                else:
                    exiting_item.delete()
                del exiting_items[product.id]
            else:
                if quantity > 0:
                    CartItem.objects.create(
                        cart=instance, product=product, quantity=quantity)

        for remaining_item in exiting_items.values():
            remaining_item.delete()
        return instance

    class Meta:
        model = Cart
        fields = ("cart_id", "user", "items")
        extra_kwargs = {
            'user': {'read_only': True},
        }


class CartSerializer(serializers.ModelSerializer):
    cart_id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, obj):
        cart_items = obj.items.all()
        return sum(cart_item.subtotal for cart_item in cart_items)

    class Meta:
        model = Cart
        fields = ("cart_id", "user", "items", "total_price")
        extra_kwargs = {
            'user': {'read_only': True},
        }
