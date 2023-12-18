from rest_framework_nested import routers
from .views import *


router = routers.DefaultRouter()
router.register('categories', CategoryViewSet, 'category')
router.register('products', ProductViewSet, 'product')
router.register('discounts', DiscountViewSet, 'discount')
router.register('carts', CartViewSet, 'cart')
router.register('customers', CustomerViewSet, 'customer')

categories_router = routers.NestedDefaultRouter(router, 'categories', lookup='category')
categories_router.register('variations', VariationViewSet, 'category-variations')
categories_router.register('products', CategoryProductViewSet, 'category-products')

products_router = routers.NestedDefaultRouter(router, 'products', lookup='product')
products_router.register('configurations', ProductConfigurationViewSet, 'product-configurations')
products_router.register('discounts', ProductDiscountViewSet, 'product-discounts')
products_router.register('images', ProductImageViewSet, 'product-images')

categories_products_router = routers.NestedDefaultRouter(categories_router, 'products', lookup='product')
categories_products_router.register('configurations', ProductConfigurationViewSet, 'product-configurations')
categories_products_router.register('discounts', ProductDiscountViewSet, 'product-discounts')
categories_products_router.register('images', ProductImageViewSet, 'product-images')

carts_router = routers.NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register('items', CartItemViewSet, 'cart-items')

customers_router = routers.NestedDefaultRouter(router, 'customers', lookup='customer')
customers_router.register('adresses', AdressViewSet, 'customer-adresses')
customers_router.register('orders', OrderViewSet, 'customer-orders')
customers_router.register('wishlist', WishViewSet, 'customer-wishlist')
customers_router.register('comparelist', CompareViewSet, 'customer-comparelist')

urlpatterns = (
    router.urls + 
    categories_router.urls + 
    products_router.urls + 
    categories_products_router.urls + 
    carts_router.urls + 
    customers_router.urls
)