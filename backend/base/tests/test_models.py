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

        self.orderItem1 = OrderItem.objects.create(
            product = self.product1,
            order = self.order1,
            name = "my_orderItem",
            qty = 1000,
            price = 1020.10
        )

        self.shippingAddress1 = ShippingAddress.objects.create(
            order = self.order1,
            address = "my_address",
            city = "my_city",
            postalcode = "111-11",
            country = "my_country",
            shippingPrice = 2002.22
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

    def test_Order(self):
        self.assertEquals(self.order1.user, self.user)
        self.assertEquals(self.order1.paymentMethod, "paypal")
        self.assertEquals(self.order1.taxPrice, 21.1)
        self.assertEquals(self.order1.shippingPrice, 100.45)
        self.assertEquals(self.order1.totalPrice, 10000.99)
        self.assertEquals(self.order1.isPaid, True)
        self.assertEquals(self.order1.isDelivered, False)
        self.assertEquals(self.order1.deliveredAt, None)
        
    def test_OrderItem(self):
        self.assertEquals(self.orderItem1.product, self.product1)
        self.assertEquals(self.orderItem1.order, self.order1)
        self.assertEquals(self.orderItem1.name, "my_orderItem")
        self.assertEquals(self.orderItem1.qty, 1000)
        self.assertEquals(self.orderItem1.price, 1020.10)
        self.assertEquals(self.orderItem1.image, None)

    def ShippingAddress(self):
        self.assertEquals(self.shippingAddress1.order, self.order1)
        self.assertEquals(self.shippingAddress1.address, "my_address")
        self.assertEquals(self.shippingAddress1.city, "my_city")
        self.assertEquals(self.shippingAddress1.postalcode, "111-11")
        self.assertEquals(self.shippingAddress1.country, "my_country")
        self.assertEquals(self.shippingAddress1.shippingPrice, 2002.22)
    
