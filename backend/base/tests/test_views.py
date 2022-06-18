
from urllib import response
from django.test import TestCase
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.test import TestCase, Client
from django.urls import reverse
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import UserSerializerWithToken
import json
from rest_framework.test import RequestsClient

class TestViews(TestCase):
    
    def setUp(self):
        password = "asd"
        test_user_password = "password"
        self.newUser_password = "NewUser"

        my_admin = User.objects.create_superuser('asd', 'asd@email.com', password)
        self.test_user = User.objects.create_user('user', 'user@email.com', test_user_password)

        serializer = UserSerializerWithToken(my_admin, many=False) #create token
        user_serializer = UserSerializerWithToken(self.test_user, many=False) #create token

        c = Client()
        self.c2 = Client()
        self.unathorized_user = Client()

        c.login(username=my_admin.username, password=password)
        self.c2.login(username=self.test_user.username, password=test_user_password)

        token = serializer.data['token']
        user_token = user_serializer.data['token']
        self.auth_headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(token)}
        self.user_auth_headers = {'Authorization': 'Bearer {}'.format(user_token)}

        self.users = c.get('/users/', **self.auth_headers)
        self.response = c.get(reverse('users'))

        product1 = Product.objects.create(
            user = my_admin,
            name = "my_product",
            description = "my_description",
            rating = 4.41,
            numReviews = 10,
            price = 12.4,
            countInStock = 1000
        )

        Product.objects.create(
            user = my_admin,
            name = "my_product2",
            description = "my_description2",
            rating = 1,
            numReviews = 1,
            price = 1,
            countInStock = 1
        )
        
        order1 = Order.objects.create(
            user=my_admin,
            paymentMethod="paypal",
            taxPrice="12.2",
            shippingPrice="11.11",
            totalPrice="23.31"
        )

        OrderItem.objects.create(
            product = product1,
            order = order1,
            name = "my_orderItem",
            qty = 1000,
            price = 1020.10
        )

    # Testing user_views getUsers()
    def test_getUsers(self):

        self.assertEquals(self.users.status_code, 200) # z autnetyfikacją
        self.assertEquals(self.response.status_code, 401) # bez autentyfikacji

        self.assertEquals(self.users.data[0]["username"], "asd@email.com")
        self.assertEquals(self.users.data[0]["email"], "asd@email.com")
        self.assertEquals(self.users.data[0]["id"], 1)
        self.assertEquals(self.users.data[0]["isAdmin"], True)

        self.assertEquals(self.users.data[1]["username"], "user@email.com")
        self.assertEquals(self.users.data[1]["email"], "user@email.com")
        self.assertEquals(self.users.data[1]["id"], 2)
        self.assertEquals(self.users.data[1]["isAdmin"], False)

    # Testing user_views registerUser()
    def test_RegisterUser(self):

        self.reponse2 = self.unathorized_user.post(reverse('register'), {"name": "new_User", "email": "newUser@email.com", "password": self.newUser_password})
        self.assertEquals(self.reponse2.data["username"], "newUser@email.com")
        self.assertEquals(self.reponse2.data["email"], "newUser@email.com")
        self.assertEquals(self.reponse2.data["name"], "new_User")
        self.assertEquals(self.reponse2.data["isAdmin"], False)

    def test_getProducts(self):
        c = Client()
        self.products = c.get(reverse('products'))

        self.assertEquals(self.products.data[0]["name"], "my_product")
        self.assertEquals(self.products.data[0]["description"], "my_description")
        self.assertEquals(self.products.data[0]["rating"], "4.41")
        self.assertEquals(self.products.data[0]["numReviews"], 10)
        self.assertEquals(self.products.data[0]["price"], "12.40")
        self.assertEquals(self.products.data[0]["countInStock"], 1000)

        self.assertEquals(self.products.data[1]["name"], "my_product2")
        self.assertEquals(self.products.data[1]["description"], "my_description2")
        self.assertEquals(self.products.data[1]["rating"], "1.00")
        self.assertEquals(self.products.data[1]["numReviews"], 1)
        self.assertEquals(self.products.data[1]["price"], "1.00")
        self.assertEquals(self.products.data[1]["countInStock"], 1)

    def test_getProduct(self):
        c = Client()
        self.product = c.get(reverse("product", kwargs={'pk': 1}))
        
        self.assertEquals(self.product.data["name"], "my_product")
        self.assertEquals(self.product.data["description"], "my_description")
        self.assertEquals(self.product.data["rating"], "4.41")
        self.assertEquals(self.product.data["numReviews"], 10)
        self.assertEquals(self.product.data["price"], "12.40")
        self.assertEquals(self.product.data["countInStock"], 1000)
        
        self.product2 = c.get(reverse("product", kwargs={'pk': 2}))

        self.assertEquals(self.product2.data["name"], "my_product2")
        self.assertEquals(self.product2.data["description"], "my_description2")
        self.assertEquals(self.product2.data["rating"], "1.00")
        self.assertEquals(self.product2.data["numReviews"], 1)
        self.assertEquals(self.product2.data["price"], "1.00")
        self.assertEquals(self.product2.data["countInStock"], 1)
        
    def test_getMyOrders(self):
        c = Client()
        self.getOrders = c.get(reverse("myorders"), **self.auth_headers)

        self.assertEquals(self.getOrders.data[0]['orderItems'][0]['name'], 'my_orderItem')
        self.assertEquals(self.getOrders.data[0]['orderItems'][0]['qty'], 1000)
        self.assertEquals(self.getOrders.data[0]['orderItems'][0]['price'], "1020.10")
        self.assertEquals(self.getOrders.data[0]['orderItems'][0]['order'], 1)

    def test_getOrderById(self):
        c = Client()
        self.getOrder = c.get(reverse('user-order', kwargs={"pk": 1}), **self.auth_headers)

        self.assertEquals(self.getOrder.data["orderItems"][0]['name'], 'my_orderItem')
        self.assertEquals(self.getOrder.data['orderItems'][0]['qty'], 1000)
        self.assertEquals(self.getOrder.data['orderItems'][0]['price'], "1020.10")
        self.assertEquals(self.getOrder.data['orderItems'][0]['order'], 1)
        self.assertEquals(self.getOrder.data["user"]['username'], 'asd@email.com')
        self.assertEquals(self.getOrder.data["user"]['email'], 'asd@email.com')
        self.assertEquals(self.getOrder.data["paymentMethod"], 'paypal')
        self.assertEquals(self.getOrder.data["shippingPrice"], '11.11')
        self.assertEquals(self.getOrder.data["deliveredAt"], None)
        