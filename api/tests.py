from django.test import TestCase
from django.urls import reverse

from api.models import Order, User

# Create your tests here.


class UserOrderTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username="user1", password="pass1")
        user2 = User.objects.create_user(username="user2", password="pass2")
        Order.objects.create(user=user1)
        Order.objects.create(user=user1)
        Order.objects.create(user=user2)
        Order.objects.create(user=user2)

    def test_user_order_url_retrieve_only_authenticated_user_orders(self):
        user = User.objects.get(username="user1")
        self.client.force_login(user)
        response = self.client.get(reverse("user-order"))

        assert response.status_code == 200
        data = response.json()
        print(data)
