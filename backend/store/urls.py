from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='product_list'),
    path('products/<int:pk>/', views.product_detail, name='product_detail'),
    path('cart/', views.cart_list, name='cart_list'),
    path('cart/add/', views.cart_add, name='cart_add'),
    path('checkout/', views.checkout, name='checkout'),
]