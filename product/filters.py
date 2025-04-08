import django_filters
from rest_framework import filters

from product.models import Product


class InStockFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(stock__gt=0)


class ProductFilter(django_filters.FilterSet):
    # name = django_filters.CharFilter(lookup_expr="iexact")

    class Meta:
        model = Product
        fields = {
            'name': ['exact', "contains"],
            'price': ['exact', 'lt', 'gt', 'range']
        }
