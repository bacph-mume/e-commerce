from django.contrib import admin

from category.models import Category

# Register your models here.


class CategoryAdmin(admin.ModelAdmin):
    exclude = ['slug']


admin.site.register(Category, CategoryAdmin)
