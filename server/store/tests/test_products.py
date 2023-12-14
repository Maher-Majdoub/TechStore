from rest_framework import status
from model_bakery import baker
from store.models import Product, Category
import pytest


def get_valid_product():
    category = baker.make(Category)
    return {
        'category_id': category.pk,
        'name': 'test',
        'reference': 'test',
        'description': 'test',
        'unit_price': '19.10',
        'inventory': '12'
    }

@pytest.fixture
def create_product(api_client):
    def do_create_product(product):
        return api_client.post('/store/products/', product)
    return do_create_product

@pytest.fixture
def delete_product(api_client):
    def do_delete_product(id):
        return api_client.delete(f'/store/products/{id}/')
    return do_delete_product

@pytest.fixture
def put_product(api_client):
    def do_put_product(id, data):
        return api_client.put(f'/store/products/{id}/', data)
    return do_put_product

@pytest.fixture
def patch_product(api_client):
    def do_patch_product(id, data):
        return api_client.patch(f'/store/products/{id}/', data)
    return do_patch_product


@pytest.mark.django_db
class TestCreateProduct:
    def test_if_user_is_anonymous_returns_401(self, create_product):
        response = create_product(get_valid_product())
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_admin_returns_403(self, create_product, authenticate):
        authenticate()
        response = create_product(get_valid_product())
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_category_not_exists_returns_400(self, create_product, authenticate):
        authenticate(is_staff=True)
        response = create_product({**get_valid_product(), 'category_id': 1000})
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_if_name_or_reference_exists_returns_400(self, create_product, authenticate):
        authenticate(is_staff=True)
        product = baker.make(Product)
        response1 = create_product({**get_valid_product(), 'name': product.name})
        response2 = create_product({**get_valid_product(), 'reference': product.reference})
        assert response1.status_code == response2.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_data_is_valid_returns_201(self, create_product, authenticate):
        authenticate(is_staff=True)
        response = create_product(get_valid_product())
        assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
class TestDeleteProduct:
    def test_if_user_is_anonymous_returns_401(self, delete_product):
        product = baker.make(Product)
        response = delete_product(product.pk)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_admin_returns_403(self, delete_product, authenticate):
        authenticate()
        product = baker.make(Product)
        response = delete_product(product.pk)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_product_not_exists_retruns_404(self, delete_product, authenticate):
        authenticate(is_staff=True)
        response = delete_product(-1)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_if_data_is_valid_returns_204(self, delete_product, authenticate):
        authenticate(is_staff=True)
        product = baker.make(Product)
        response = delete_product(product.pk)
        assert response.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
class TestPutProduct:
    def test_is_user_is_anonymous_returns_401(self, put_product):
        prodcut = baker.make(Product)
        response = put_product(prodcut.pk, get_valid_product())
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_is_user_is_not_admin_returns_403(self, put_product, authenticate):
        authenticate()
        prodcut = baker.make(Product)
        response = put_product(prodcut.pk, get_valid_product())
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_product_not_exists_returns_404(self, put_product, authenticate):
        authenticate(is_staff=True)
        response = put_product(-1, get_valid_product())
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_if_name_or_reference_exists_returns_400(self, put_product, authenticate):
        authenticate(is_staff=True)
        product1 = baker.make(Product)
        product2 = baker.make(Product)
        response1 = put_product(product2.pk, {**get_valid_product(), 'name': product1.name})
        response2 = put_product(product2.pk, {**get_valid_product(), 'reference': product1.reference})
        assert response1.status_code == response2.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_data_is_valid_returns_200(self, put_product, authenticate):
        authenticate(is_staff=True)
        product = baker.make(Product)
        response = put_product(product.pk, get_valid_product())
        assert response.status_code == status.HTTP_200_OK
        

@pytest.mark.django_db
class TestPatchProduct:
    def test_is_user_is_anonymous_returns_401(self, patch_product):
        prodcut = baker.make(Product)
        response = patch_product(prodcut.pk, get_valid_product())
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_is_user_is_not_admin_returns_403(self, patch_product, authenticate):
        authenticate()
        prodcut = baker.make(Product)
        response = patch_product(prodcut.pk, get_valid_product())
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_product_not_exists_returns_404(self, patch_product, authenticate):
        authenticate(is_staff=True)
        response = patch_product(-1, get_valid_product())
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_if_name_or_reference_exists_returns_400(self, patch_product, authenticate):
        authenticate(is_staff=True)
        product1 = baker.make(Product)
        product2 = baker.make(Product)
        response1 = patch_product(product2.pk, {'name': product1.name})
        response2 = patch_product(product2.pk, {'reference': product1.reference})
        assert response1.status_code == response2.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_data_is_valid_returns_200(self, patch_product, authenticate):
        authenticate(is_staff=True)
        product = baker.make(Product)
        response = patch_product(product.pk, get_valid_product())
        assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
class TestRetreiveProduct:
    def test_if_product_not_exists_returns_404(self, api_client):
        response = api_client.get('/store/products/-1/')
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_if_product_exists_returns_200(self, api_client):
        product = baker.make(Product)
        response = api_client.get(f'/store/products/{product.pk}/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_list_products_returns_200(self, api_client):
        response = api_client.get('/store/products/')
        assert response.status_code == status.HTTP_200_OK