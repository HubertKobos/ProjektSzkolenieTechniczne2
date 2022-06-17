
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
        my_admin = User.objects.create_superuser('asd', 'asd@email.com', password)
        serializer = UserSerializerWithToken(my_admin, many=False) #create token
        c = Client()
        c.login(username=my_admin.username, password=password)
        token = serializer.data['token']
        auth_headers = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(token)}
        self.users = c.get('/users/', **auth_headers)
        self.response = c.get(reverse('users'))
    
    # Testing order_views
    def test_getUsers(self):

        self.assertEquals(self.users.status_code, 200) # z autnetyfikacją
        self.assertEquals(self.response.status_code, 401) # bez autentyfikacji

        # requestClient = RequestsClient()
        # responseClient = requestClient.get()
        
        # print(response.content)

        