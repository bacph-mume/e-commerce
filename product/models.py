
from random import random
from django.db import models
from category.models import Category
from django.utils.text import slugify


# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveBigIntegerField()
    image = models.ImageField(
        upload_to="products/", blank=True, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='products')

    @property
    def in_stock(self):
        return self.stock > 0

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        if Product.objects.filter(slug=self.slug).exists():
            self.slug += "-" + str(int(random() * 1000))
        super().save(*args, **kwargs)
