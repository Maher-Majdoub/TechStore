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
from rest_framework.decorators import action
from .models import *
from .serializers import *
from .permissions import *

class CategoryViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Category.objects.prefetch_related('sub_categories__sub_categories')

        pk = self.kwargs.get('pk')
        if pk:
            return queryset.filter(id=pk)
        return queryset.filter(parent_category=None)
    
    def get_serializer_class(self):
        return GetCategorySerializer if self.request.method == 'GET' else CategorySerializer
    
    def create(self, request, *args, **kwargs):
        parent_category = request.data.get('parent_category')
        if parent_category and not Category.objects.filter(id=parent_category).exists():
            raise ValidationError({'Error': 'Parent category does not exist.'})
        return super().create(request, *args, **kwargs)
    


class VariationViewSet(ModelViewSet):
    serializer_class = VariationSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return Variation.objects.filter(category=self.kwargs['category_pk'])

    def get_serializer_context(self):
        return {'category_id': self.kwargs['category_pk']}
    
    def create(self, request, *args, **kwargs):
        if not Category.objects.filter(id=kwargs['category_pk']).exists():
            return Response({'Error': 'Category not found.'}, status.HTTP_404_NOT_FOUND)
        return super().create(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        if not Category.objects.filter(id=kwargs['category_pk']).exists():
            return Response({'Error': 'Category not found.'}, status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)


class ProductConfigurationViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return ProductConfiguration.objects.filter(product_id=self.kwargs['product_pk'])

    def get_serializer_class(self):
        return GetProductConfigurationSerializer if self.request.method == 'GET' else ProductConfigurationSerializer
    
    def get_serializer_context(self):
        return {'product_id': self.kwargs['product_pk']}

class ProductViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return Product.objects.all().prefetch_related('category', 'configurations__variation', 'discounts', 'images')

    def get_serializer_class(self):
        return GetProductSerializer if self.request.method == 'GET' else ProductSerializer


class CategoryProductViewSet(ProductViewSet):
    def get_queryset(self):
        return super().get_queryset().filter(category_id=self.kwargs['category_pk'])

    def get_serializer_context(self):
        return {'category_id': self.kwargs['category_pk']}
    
    def get_serializer_class(self):
        return GetCategoryProductSerializer if self.request.method == 'GET' else CategoryProductSerializer


class DiscountViewSet(ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    permission_classes = [IsAdminOrReadOnly]
    http_method_names = ['get', 'put', 'patch', 'delete', 'options']


class ProductDiscountViewSet(ModelViewSet):
    serializer_class = ProductDiscountSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return Discount.objects.filter(product_id=self.kwargs['product_pk'])
    
    def get_serializer_context(self):
        return {'product_id': self.kwargs['product_pk']}
    

class ProductImageViewSet(ModelViewSet):
    serializer_class = ProductImageSerializer
    permission_classes = [IsAdminOrReadOnly]
    http_method_names = ['get', 'post', 'delete', 'options']

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
    # 1f0fa040-4059-4cfd-9471-b19064c8f784
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
    #authentication_classes = [IsAuthenticated]
    
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
        customer = Customer.objects.prefetch_related("adresses").get(
            user_id=request.user.id
        )

        if request.method == "GET":
            serializer = CustomerSerializer(customer)

        elif request.method == "PUT":
            serializer = CustomerSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data)