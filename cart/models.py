from itertools import product
import re
from django.db import models
from product.models import Product
from user.models import User
import uuid

# Create your models here.


class Cart(models.Model):
    cart_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="cart"
    )
    product = models.ManyToManyField(
        Product, through="CartItem", related_name="cart"
    )

    def __str__(self):
        return f"Cart {self.cart_id} for {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    @property
    def subtotal(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Cart {self.cart.cart_id}"
