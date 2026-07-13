from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Product, CartItem, Order
from .serializers import ProductSerializer, CartItemSerializer, OrderSerializer


@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    category = request.query_params.get('category')
    if category:
        products = products.filter(category__iexact=category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    return Response(ProductSerializer(product).data)


@api_view(['GET'])
def cart_list(request):
    items = CartItem.objects.select_related('product').all()
    serializer = CartItemSerializer(items, many=True)
    total = sum(item.product.price * item.quantity for item in items)
    return Response({'items': serializer.data, 'total': total, 'count': items.count()})


@api_view(['POST'])
def cart_add(request):
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))

    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    cart_item, created = CartItem.objects.get_or_create(product=product)
    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity
    cart_item.save()

    return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def checkout(request):
    items = CartItem.objects.select_related('product').all()

    if not items.exists():
        return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

    snapshot = [
        {
            'product_id': item.product.id,
            'name': item.product.name,
            'price': str(item.product.price),
            'quantity': item.quantity,
        }
        for item in items
    ]
    total = sum(item.product.price * item.quantity for item in items)

    Order.objects.create(items=snapshot, total=total)
    items.delete()

    return Response({'message': 'Your order is confirmed and will be delivered in 3 days'}, status=status.HTTP_201_CREATED)