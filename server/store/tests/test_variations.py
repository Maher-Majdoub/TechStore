from rest_framework import status
from model_bakery import baker
from store.models import Category, Variation
import pytest


# @pytest.fixture
# def create_variation(api_client):
#     def do_create_variation(category_id, variation):
#         return api_client.post(f'/store/categories/{category_id}/variations/', variation)
#     return do_create_variation

# @pytest.fixture
# def delete_variation(api_client):
#     def do_delete_category(category_id, id):
#         return api_client.delete(f'/store/categories/{category_id}/variations/{id}/')
#     return do_delete_category

# @pytest.fixture
# def put_variation(api_client):
#     def do_put_category(category_id, id, data):
#         return api_client.put(f'/store/categories/{category_id}/variations/{id}/', data)
#     return do_put_category

# @pytest.fixture
# def patch_variation(api_client):
#     def do_patch_variation(category_id, id, data):
#         return api_client.patch(f'/store/categories/{category_id}/variations/{id}/', data)
#     return do_patch_variation


# @pytest.mark.django_db
# class TestCreateVariation:
#     def test_if_user_is_anonymous_returns_401(self, create_variation):
#         category = baker.make(Category)
#         response = create_variation(category.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
#     def test_if_user_is_not_admin_returns_403(self, create_variation, authenticate):
#         authenticate()
#         category = baker.make(Category)
#         response = create_variation(category.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_403_FORBIDDEN

#     def test_if_category_not_exists_returns_404(self, create_variation, authenticate):
#         authenticate(is_staff=True)
#         response = create_variation(-1, {'name': 'a'})
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_variaiton_name_exits_in_same_category_returns_400(self, create_variation, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response1 = create_variation(category.id, {'name': 'a'})
#         response2 = create_variation(category.id, {'name': 'a'})
#         assert response1.status_code == status.HTTP_201_CREATED and response2.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_data_is_valid_returns_201(self, create_variation, authenticate):
#         authenticate(is_staff=True)
#         category1 = baker.make(Category)
#         category2 = baker.make(Category)
#         response1 = create_variation(category1.id, {'name': 'a'})
#         response2 = create_variation(category1.id, {'name': 'b'})
#         response3 = create_variation(category2.id, {'name': 'a'})
#         assert response1.status_code == status.HTTP_201_CREATED \
#                 and response2.status_code == status.HTTP_201_CREATED \
#                 and response3.status_code == status.HTTP_201_CREATED


# @pytest.mark.django_db
# class TestDeleteVariation:
#     def test_if_user_is_anonymous_returns_401(self, delete_variation):
#         variation = baker.make(Variation)
#         response = delete_variation(variation.category.id, variation.id)
#         assert response.status_code == status.HTTP_401_UNAUTHORIZED

#     def test_if_user_is_not_admin_returns_403(self, delete_variation, authenticate):
#         authenticate()
#         variation = baker.make(Variation)
#         response = delete_variation(variation.category.id, variation.id)
#         assert response.status_code == status.HTTP_403_FORBIDDEN


#     def test_if_category_not_exists_returns_404(self, delete_variation, authenticate):
#         authenticate(is_staff=True)
#         variation = baker.make(Variation)
#         response = delete_variation(-1, variation.id)
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_variation_not_exists_returns_404(self, delete_variation, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response = delete_variation(category.id, -1)
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_data_is_valid_returns_204(self, delete_variation, authenticate):
#         authenticate(is_staff=True)
#         variation = baker.make(Variation)
#         response = delete_variation(variation.category.id, variation.id)
#         assert response.status_code == status.HTTP_204_NO_CONTENT


# @pytest.mark.django_db
# class TestPutVariation:
#     def test_if_user_is_anonymous_returns_401(self, put_variation):
#         variation = baker.make(Variation)
#         response = put_variation(variation.category.id, variation.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_401_UNAUTHORIZED

#     def test_if_user_is_not_admin_returns_403(self, put_variation, authenticate):
#         authenticate()
#         variation = baker.make(Variation)
#         response = put_variation(variation.category.id, variation.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_403_FORBIDDEN


#     def test_if_category_not_exists_returns_404(self, put_variation, authenticate):
#         authenticate(is_staff=True)
#         variation = baker.make(Variation)
#         response = put_variation(-1, variation.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_variation_not_exists_returns_404(self, put_variation, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response = put_variation(category.id, -1, {'name': 'a'})
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_variaiton_name_exits_in_same_category_returns_400(self, put_variation, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         varaition1 = baker.make(Variation, category_id=category.id)
#         varaition2 = baker.make(Variation, category_id=category.id)
#         response = put_variation(category.id, varaition2.id, {'name': varaition1.name})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST


#     def test_if_data_is_valid_returns_201(self, put_variation, authenticate):
#         authenticate(is_staff=True)
#         category1 = baker.make(Category)
#         category2 = baker.make(Category)
#         variation1 = baker.make(Variation, category_id = category1.id)
#         variation2 = baker.make(Variation, category_id = category2.id)
#         response = put_variation(category1.id, variation1.id, {'name': variation2.name})
#         assert response.status_code == status.HTTP_200_OK


# @pytest.mark.django_db
# class TestPatchVariation:
#     def test_if_user_is_anonymous_returns_401(self, patch_variation):
#         variation = baker.make(Variation)
#         response = patch_variation(variation.category.id, variation.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_401_UNAUTHORIZED

#     def test_if_user_is_not_admin_returns_403(self, patch_variation, authenticate):
#         authenticate()
#         variation = baker.make(Variation)
#         response = patch_variation(variation.category.id, variation.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_403_FORBIDDEN


#     def test_if_category_not_exists_returns_404(self, patch_variation, authenticate):
#         authenticate(is_staff=True)
#         variation = baker.make(Variation)
#         response = patch_variation(-1, variation.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_variation_not_exists_returns_404(self, patch_variation, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response = patch_variation(category.id, -1, {'name': 'a'})
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_variaiton_name_exits_in_same_category_returns_400(self, patch_variation, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         varaition1 = baker.make(Variation, category_id=category.id)
#         varaition2 = baker.make(Variation, category_id=category.id)
#         response = patch_variation(category.id, varaition2.id, {'name': varaition1.name})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST


#     def test_if_data_is_valid_returns_201(self, patch_variation, authenticate):
#         authenticate(is_staff=True)
#         category1 = baker.make(Category)
#         category2 = baker.make(Category)
#         variation1 = baker.make(Variation, category_id = category1.id)
#         variation2 = baker.make(Variation, category_id = category2.id)
#         response = patch_variation(category1.id, variation1.id, {'name': variation2.name})
#         assert response.status_code == status.HTTP_200_OK


# @pytest.mark.django_db
# class TestRetrieveVariation:
#     def test_if_category_does_not_exists_returns_404(self, api_client):
#         response = api_client.get(f'/store/categories/-1/variations/')
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_variation_does_not_exists_returns_404(self, api_client):
#         category = baker.make(Category)
#         response = api_client.get(f'/store/categories/{category.id}/variations/-1/')
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_variation_exists_returns_200(self, api_client):
#         category = baker.make(Category)
#         variation = baker.make(Variation, category_id = category.id)
#         response = api_client.get(f'/store/categories/{category.id}/variations/{variation.id}/')
#         assert response.status_code == status.HTTP_200_OK

#     def test_if_list_variations_returns_200(self, api_client):
#         category = baker.make(Category)
#         response = api_client.get(f'/store/categories/{category.id}/variations/')
#         assert response.status_code == status.HTTP_200_OK