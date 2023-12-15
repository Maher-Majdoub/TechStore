from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.validators import ValidationError
from rest_framework.mixins import (
    RetrieveModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
)
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import DefaultPagination
from .models import *
from .serializers import *


class CategoryViewSet(ModelViewSet):
    http_method_names = ['get', 'options']
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = Category.objects.prefetch_related('sub_categories__sub_categories')

        pk = self.kwargs.get('pk')
        if pk:
            return queryset.filter(id=pk)
        return queryset.filter(parent_category=None)
    

class VariationViewSet(ModelViewSet):
    serializer_class = VariationSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return Variation.objects.filter(category=self.kwargs['category_pk'])

    def get_serializer_context(self):
        return {'category_id': self.kwargs['category_pk']}
    
    def list(self, request, *args, **kwargs):
        if not Category.objects.filter(id=kwargs['category_pk']).exists():
            return Response({'Error': 'Category not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)


class ProductConfigurationViewSet(ModelViewSet):
    serializer_class = GetProductConfigurationSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return ProductConfiguration.objects.filter(product_id=self.kwargs['product_pk'])
    
    def get_serializer_context(self):
        return {'product_id': self.kwargs['product_pk']}


class ProductViewSet(ModelViewSet):
    serializer_class = GetProductSerializer
    http_method_names = ['get', 'options']
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['reference', 'name']
    search_fields = ['reference', 'name']
    ordering_fileds = ['unit_price']
    pagination_class = DefaultPagination

    def get_queryset(self):
        return Product.objects.all().prefetch_related('category', 'configurations__variation', 'discounts', 'images')


class CategoryProductViewSet(ProductViewSet):
    serializer_class = GetCategoryProductSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return super().get_queryset().filter(category_id=self.kwargs['category_pk'])

    def get_serializer_context(self):
        return {'category_id': self.kwargs['category_pk']}


class DiscountViewSet(ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    http_method_names = ['get', 'options']


class ProductDiscountViewSet(ModelViewSet):
    serializer_class = ProductDiscountSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return Discount.objects.filter(product_id=self.kwargs['product_pk'])
    
    def get_serializer_context(self):
        return {'product_id': self.kwargs['product_pk']}
    

class ProductImageViewSet(ModelViewSet):
    serializer_class = ProductImageSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return ProductImage.objects.filter(product_id=self.kwargs['product_pk'])
    
    def get_serializer_context(self):
        return {'product_id': self.kwargs['product_pk']}
    

class CartViewSet(
            RetrieveModelMixin, 
            CreateModelMixin, 
            DestroyModelMixin, 
            GenericViewSet
        ):
    
    serializer_class = CartSerializer
    queryset = Cart.objects.all().prefetch_related('items__product')
    

class CartItemViewSet(ModelViewSet):
    def get_serializer_class(self):
        return GetCartItemSerializer if self.request.method == 'GET' else CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(cart_id=self.kwargs['cart_pk']).prefetch_related('product')

    def get_serializer_context(self):
        return {'cart_id': self.kwargs['cart_pk']}
    

class AdressViewSet(ModelViewSet):
    serializer_class = AdressSerializer
    permission_classes = [IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            id = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = id
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            id = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = id
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return Adress.objects.filter(customer=self.kwargs['customer_pk'])
    
    def get_serializer_context(self):
        return {'customer_id': self.kwargs['customer_pk']}


class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all().prefetch_related('adresses')
    serializer_class = CustomerSerializer
    http_method_names = ["get", "put", "patch", "options"]
    permission_classes = [IsAdminUser]

    @action(methods=["GET", "PUT"], detail=False, permission_classes=[IsAuthenticated])
    def me(self, request):
        customer = Customer.objects.get(user_id=request.user.id)
        if request.method == "GET":
            serializer = CustomerSerializer(customer)

        elif request.method == "PUT":
            serializer = CustomerSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data)   
    

class OrderViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.kwargs['customer_pk']).prefetch_related('items__product')

    def get_serializer_class(self):
        return GetOrderSerializer if  self.request.method == 'GET' else OrderSerializer

    def get_serializer_context(self):
        return {
            'user': self.request.user,
            'customer': Customer.objects.get(id=self.kwargs['customer_pk']),
        }

    # find a better solution
    def list(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.id
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.id
        return super().create(request, *args, **kwargs)


class OrderItemViewSet(ModelViewSet):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(order=self.kwargs['order_pk']).select_related('product')

    def get_serializer_context(self):
        return {'order_id': self.kwargs['order_pk']}


class WishViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.id
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.id
        return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        return Wish.objects.filter(customer=self.kwargs['customer_pk']).select_related('product')
    
    def get_serializer_class(self):
        return GetWishSerializer if self.request.method == 'GET' else WishSerializer

    def get_serializer_context(self):
        return {'customer_id': self.kwargs['customer_pk']}
    

class CompareViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.id
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.id
        return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        return Compare.objects.filter(customer=self.kwargs['customer_pk']).select_related('product')
    
    def get_serializer_class(self):
        return GetCompareSerializer if self.request.method == 'GET' else CompareSerializer

    def get_serializer_context(self):
        return {'customer_id': self.kwargs['customer_pk']}
