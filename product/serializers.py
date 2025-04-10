
from rest_framework import serializers
from .models import Product

class RelativeProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'slug', 'price', 'image')

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    relative_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ("id", "name", 'slug', "description", "price",
                  "stock", 'image', 'category', 'relative_products')
        
    def get_relative_products(self, obj):
        related_products = Product.objects.filter(category=obj.category).exclude(id=obj.id)
        return RelativeProductSerializer(related_products, many=True).data
    

    def validate_price(self, value):
        if (value <= 0):
            raise serializers.ValidationError("Price must be greater than 0")
        return value

    def validate_stock(self, value):
        if (value < 0):
            raise serializers.ValidationError(
                "Stock must be greater than or equal to 0")
        return value
