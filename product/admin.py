from django.contrib import admin

from product.models import Product


class ProductAdmin(admin.ModelAdmin):
    exclude = ['slug']


# Register your models here.
admin.site.register(Product, ProductAdmin)
