
from django.test import SimpleTestCase
from django.test import SimpleTestCase
from django.urls import reverse, resolve

from base.views.order_views import addOrderItems, getMyOrders, getOrderById, updateOrderToPaid
from base.views.product_views import getProducts, getProduct
from base.views.user_views import MyTokenObtainPairView, registerUser, getUserProfile, updateUserProfile, getUsers

class TestUrls(SimpleTestCase):

    # Testing order_urls
    def test_order_urls_orders_add_is_resolved(self):
        url = reverse('orders-add')
        self.assertEquals(resolve(url).func, addOrderItems)

    def test_order_urls_myorders_is_resolved(self):
        url = reverse('myorders')
        self.assertEquals(resolve(url).func, getMyOrders)

    def test_order_urls_user_order_is_resolved(self):
        url = reverse('user-order', args=['1'])
        self.assertEquals(resolve(url).func, getOrderById)

    def test_order_urls_pay_is_resolved(self):
        url = reverse('pay', args=['1'])
        self.assertEquals(resolve(url).func, updateOrderToPaid)

    # Testing product_urls
    def test_product_urls_products_is_resolved(self):
        url = reverse('products')
        self.assertEquals(resolve(url).func, getProducts)

    def test_product_urls_product_is_resolved(self):
        url = reverse('product', args=['1'])
        self.assertEquals(resolve(url).func, getProduct)

    # Testing user_urls
    def test_user_urls_token_obtain_pai_is_resolved(self):
        url = reverse('token_obtain_pair')
        self.assertEquals(resolve(url).func.view_class, MyTokenObtainPairView)

    def test_users_urls_register_user_is_resolved(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, registerUser)
    
    def test_users_urls_user_profile_is_resolved(self):
        url = reverse('user-profile')
        self.assertEquals(resolve(url).func, getUserProfile)

    def test_users_urls_user_profile_udpate_is_resolved(self):
        url = reverse('user-profile-udpate')
        self.assertEquals(resolve(url).func, updateUserProfile)

    def test_users_urls_users_is_resolved(self):
        url = reverse('users')
        self.assertEquals(resolve(url).func, getUsers)