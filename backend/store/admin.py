from django.contrib import admin
from .models import Product, CartItem, Order


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'old_price')
    list_filter = ('category',)
    search_fields = ('name',)


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'quantity')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'total', 'created_at')
    readonly_fields = ('items', 'total', 'created_at')
    ordering = ('-created_at',)