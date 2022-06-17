from django.test import TestCase
from base.models import Product, Order, OrderItem, ShippingAddress
from django.contrib.auth.models import User

class TestModels(TestCase):

    def setUp(self):

        self.user = User.objects.create(
            username = "username",
            password = "password"
        )

        self.product1 = Product.objects.create(
            user = self.user,
            name = "my_product",
            description = "my_description",
            rating = 2.4,
            numReviews = 10,
            price = 12.4,
            countInStock = 1000
        )

        self.order1 = Order.objects.create(
            user = self.user,
            paymentMethod = "paypal",
            taxPrice = 21.1,
            shippingPrice = 100.45,
            totalPrice = 10000.99,
            isPaid = True,
            isDelivered = False
        )

    def test_Product(self):
        self.assertEquals(self.product1.user, self.user)
        self.assertEquals(self.product1.name, "my_product")
        self.assertEquals(self.product1.image, None)
        self.assertEquals(self.product1.brand, None)
        self.assertEquals(self.product1.category, None)
        self.assertEquals(self.product1.description, "my_description")
        self.assertEquals(self.product1.rating, 2.4)
        self.assertEquals(self.product1.numReviews, 10)
        self.assertEquals(self.product1.price, 12.4)
        self.assertEquals(self.product1.countInStock, 1000)

    
