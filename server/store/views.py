from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.mixins import (
    RetrieveModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
)
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import NoLimitPagination
from .models import (
    Category, Variation, ProductConfiguration, Discount, 
    ProductImage, Product,CartItem, Cart, Address, ProductInfo,
    Customer, OrderItem, Order, Compare, Wish, ProductTag, Tag,
)
from .serializers import (
    CategorySerializer, VariationSerializer, ProductConfigurationSerializer, DiscountSerializer,
    ProductImageSerializer, ProductSerializer, CartItemSerializer, CartSerializer, AddressSerializer,
    CustomerSerializer, OrderItemSerializer, OrderSerializer, CompareSerializer, WishSerializer,
    ProductDiscountSerializer, GetCartItemSerializer, ProductInfoSerializer,
    GetCompareSerializer, GetOrderSerializer, GetWishSerializer, TagSerializer, ProductTagSerializer,
)


class CategoryViewSet(ModelViewSet):
    http_method_names = ['get', 'options']
    serializer_class = CategorySerializer
    pagination_class = NoLimitPagination
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Category.objects.prefetch_related('sub_categories__sub_categories')

        category_slug = self.kwargs.get('category_slug')
        slug = self.kwargs.get('slug')
        
        if category_slug:
            return queryset.filter(parent_category__slug__iexact=self.kwargs['category_slug'])
        
        elif slug:
            return queryset.filter(slug=slug, parent_category=None)
        
        return queryset.filter(parent_category=None)


class VariationViewSet(ModelViewSet):
    serializer_class = VariationSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return Variation.objects.filter(category__slug__iexact=self.kwargs['category_slug'])
    
    def list(self, request, *args, **kwargs):
        if not Category.objects.filter(slug=kwargs['category_slug']).exists():
            return Response({'detail': 'Category not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)


class ProductConfigurationViewSet(ModelViewSet):
    serializer_class = ProductConfigurationSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return ProductConfiguration.objects.filter(product__slug__iexact=self.kwargs['product_slug'])
    
    def list(self, request, *args, **kwargs):
        if not Product.objects.filter(slug=kwargs['product_slug']).exists():
            return Response({'detail': 'Product not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)


class ProductInfoViewSet(ModelViewSet):
    serializer_class = ProductInfoSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return ProductInfo.objects.filter(product__slug=self.kwargs['product_slug'])


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    http_method_names = ['get', 'options']
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['reference', 'name']
    search_fields = ['reference', 'name', 'category__name', 'category__parent_category__name']
    ordering_fileds = ['unit_price']
    lookup_field = 'slug'

    def get_queryset(self):
        query = Product.objects.prefetch_related('category', 'configurations__variation', 'discounts', 'images', 'infos')
        tag_name = self.request.GET.get('tag')
        if tag_name:
            return query.filter(tags__tag__name=tag_name)
        return query.all()


class TagViewSet(ModelViewSet):
    serializer_class = TagSerializer
    http_method_names = ['get', 'options']
    queryset = Tag.objects.all()


class ProductTagViewSet(ModelViewSet):
    serializer_class = ProductTagSerializer
    http_method_names = ['get', 'options']
    
    def get_queryset(self):
        return ProductTag.objects.all().prefetch_related('tag', 'product')


class CategoryProductViewSet(ProductViewSet):
    def get_queryset(self):
        return super().get_queryset().filter(category__slug__iexact=self.kwargs['sub_category_slug'])

    def list(self, request, *args, **kwargs):
        if not Category.objects.filter(slug=kwargs['sub_category_slug']).exists():
            return Response({'detail': 'Category not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)


class DiscountViewSet(ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    http_method_names = ['get', 'options']


class ProductDiscountViewSet(ModelViewSet):
    serializer_class = ProductDiscountSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return Discount.objects.filter(product__slug__iexact=self.kwargs['product_slug'])
    
    def list(self, request, *args, **kwargs):
        if not Product.objects.filter(slug=kwargs['product_slug']).exists():
            return Response({'detail': 'Product not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)


class ProductImageViewSet(ModelViewSet):
    serializer_class = ProductImageSerializer
    http_method_names = ['get', 'options']

    def get_queryset(self):
        return ProductImage.objects.filter(product__slug__iexact=self.kwargs['product_slug'])

    def list(self, request, *args, **kwargs):
        if not Product.objects.filter(slug=kwargs['product_slug']).exists():
            return Response({'detail': 'Product not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)
    

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
        return {**super().get_serializer_context(), 'cart_id': self.kwargs['cart_pk']}
    
    def list(self, request, *args, **kwargs):
        if not Cart.objects.filter(id=kwargs['cart_pk']).exists():
            return Response({'detail': 'Cart not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)
    

class AddressViewSet(ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            id = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = id
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        if self.kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=self.request.user.id)
            self.kwargs['customer_pk'] = customer.pk

        return Address.objects.filter(customer=self.kwargs['customer_pk'])
    
    def get_serializer_context(self):
        return { **super().get_serializer_context(), 'customer_id': self.kwargs['customer_pk']}

    def list(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.pk

        if not Customer.objects.filter(id=self.kwargs['customer_pk']).exists():
            return Response({'detail': 'Customer not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)


class CustomerViewSet(ModelViewSet):
    serializer_class = CustomerSerializer
    http_method_names = ["get", "put", "patch", "options"]
    permission_classes = [IsAdminUser]

    def get_related_fields(self):
        return [
            'addresses',
            'wish_list__product__category__parent_category',
            'wish_list__product__images',
            'wish_list__product__configurations__variation',
            'wish_list__product__discounts',
            'compare_list__product__category__parent_category',
            'compare_list__product__images',
            'compare_list__product__configurations__variation',
            'compare_list__product__discounts'
        ]

    def get_queryset(self):
        return Customer.objects.all().prefetch_related(*self.get_related_fields())

    @action(methods=["GET", "PUT"], detail=False, permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer_context = self.get_serializer_context()

        customer = Customer.objects.prefetch_related(*self.get_related_fields()) \
                                    .get(user_id=request.user.id)

        if request.method == "GET":
            serializer = CustomerSerializer(customer, context=serializer_context)

        elif request.method == "PUT":
            serializer = CustomerSerializer(customer, data=request.data, context=serializer_context)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data)   
    

class OrderViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=self.request.user.id)
            self.kwargs['customer_pk'] = customer.pk
            
        return Order.objects.filter(customer=self.kwargs['customer_pk']) \
                            .prefetch_related('customer', 'items__product')

    def get_serializer_class(self):
        return GetOrderSerializer if  self.request.method == 'GET' else OrderSerializer

    def get_serializer_context(self):
        return {
            **super().get_serializer_context(),
            'user': self.request.user,
            'customer': Customer.objects.get(id=self.kwargs['customer_pk']),
        }

    # find a better solution
    def list(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.pk
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
        return {**super().get_serializer_context(), 'order_id': self.kwargs['order_pk']}


class WishViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.pk
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.id
        return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        if self.kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=self.request.user.id)
            self.kwargs['customer_pk'] = customer.pk
        return Wish.objects.filter(customer=self.kwargs['customer_pk']).select_related('product')
    
    def get_serializer_class(self):
        return GetWishSerializer if self.request.method == 'GET' else WishSerializer

    def get_serializer_context(self):
        return {**super().get_serializer_context(), 'customer_id': self.kwargs['customer_pk']}


class CompareViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.pk
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=request.user.id)
            self.kwargs['customer_pk'] = customer.id
        return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        if self.kwargs['customer_pk'] == 'me':
            customer = Customer.objects.only('id').get(user_id=self.request.user.id)
            self.kwargs['customer_pk'] = customer.pk
        return Compare.objects.filter(customer=self.kwargs['customer_pk']).select_related('product')
    
    def get_serializer_class(self):
        return GetCompareSerializer if self.request.method == 'GET' else CompareSerializer

    def get_serializer_context(self):
        return {**super().get_serializer_context(), 'customer_id': self.kwargs['customer_pk']}
