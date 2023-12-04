from rest_framework import status
from model_bakery import baker
from store.models import Product
import pytest


@pytest.fixture
def create_product(api_client):
    def do_create_product(path_prefix, name, reference, description, unit_price, inventory):
        #path prefix : store/category/id || store/
        return api_client.post(path_prefix + '/products/', {
            name: name, 
            reference: reference, 
            description: description, 
            unit_price: unit_price, 
            inventory: inventory
        })
    return do_create_product

@pytest.mark.django_db
class TestCreateProduct:
    @pytest.mark.skip
    def test_if_user_is_anonymous_returns_401(self, path_prefix, create_product):
        response = create_product(path_prefix, 'p', 'aaa', 'p', 10, 15)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED