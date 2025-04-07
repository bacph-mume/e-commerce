import django_filters
from rest_framework import filters

from api.models import Order, Product


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


class OrderFilter(django_filters.FilterSet):
    class Meta:
        model = Order
        fields = {
            'status': ['exact'],
            'created_at': ['lt', 'gt', 'exact']
        }
