from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from api.models import Product


@receiver([post_save, post_delete], sender=Product)
def invalidate_product_cache(sender, instance, **kwargs):
    """
    Invalidate the product cache when a product is created, updated, or deleted.
    """
    print("Clearing product cache")

    cache.delete_pattern('*product_list*')
