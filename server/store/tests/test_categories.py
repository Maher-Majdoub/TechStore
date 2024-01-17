from rest_framework import status
from model_bakery import baker
from store.models import Category
import pytest

# @pytest.fixture
# def create_category(api_client):
#     def do_create_category(category):
#         return api_client.post('/store/categories/', category)
#     return do_create_category

# @pytest.fixture
# def delete_category(api_client):
#     def do_delete_category(id):
#         return api_client.delete(f'/store/categories/{id}/')
#     return do_delete_category

# @pytest.fixture
# def put_category(api_client):
#     def do_put_category(id, data):
#         return api_client.put(f'/store/categories/{id}/', data)
#     return do_put_category

# @pytest.fixture
# def patch_category(api_client):
#     def do_patch_category(id, data):
#         return api_client.patch(f'/store/categories/{id}/', data)
#     return do_patch_category


# @pytest.mark.django_db
# class TestCreateCategory:
#     def test_if_user_is_anonymous_returns_401(self, create_category):
#         response = create_category({'name': 'a'})
#         assert response.status_code == status.HTTP_401_UNAUTHORIZED

#     def test_if_user_is_not_admin_returns_403(self, create_category, authenticate):
#         authenticate()
#         response = create_category({'name': 'a'})
#         assert response.status_code == status.HTTP_403_FORBIDDEN

#     def test_if_name_is_invalid_returns_400(self, create_category, authenticate):
#         authenticate(is_staff= True)
#         category = baker.make(Category)
#         response = create_category({'name': category.name})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_parent_category_not_exists_returns_400(self, create_category, authenticate):
#         authenticate(is_staff=True)
#         response = create_category({'name': 'a', 'parent_category': -1})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_data_is_valid_returns_201(self, create_category, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response1 = create_category({'name': 'a'})
#         response2 = create_category({'name': 'b', 'parent_category': category.id})
#         assert response1.status_code == response2.status_code == status.HTTP_201_CREATED


# @pytest.mark.django_db
# class TestDeleteCategory:
#     def test_if_user_is_anonymous_returns_401(self, delete_category):
#         category = baker.make(Category)
#         response = delete_category(category.id)
#         assert response.status_code == status.HTTP_401_UNAUTHORIZED

#     def test_if_user_is_not_admin_returns_403(self, delete_category, authenticate):
#         authenticate()
#         category = baker.make(Category)
#         response = delete_category(category.id)
#         assert response.status_code == status.HTTP_403_FORBIDDEN

#     def test_if_category_not_exists_returns_404(self, delete_category, authenticate):
#         authenticate(is_staff=True)
#         response = delete_category(-1)
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_data_is_valid_returns_204(self, delete_category, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response = delete_category(category.id)
#         assert response.status_code == status.HTTP_204_NO_CONTENT


# @pytest.mark.django_db
# class TestPutCategory:
#     def test_if_user_is_anonymous_returns_401(self, put_category):
#         category = baker.make(Category)
#         response = put_category(category.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_401_UNAUTHORIZED

#     def test_if_user_is_not_admin_returns_403(self, put_category, authenticate):
#         authenticate()
#         category = baker.make(Category)
#         response = put_category(category.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_403_FORBIDDEN

#     def test_if_parent_category_not_exists_returns_400(self, put_category, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response = put_category(category.id, {'name': 'a', 'parent_category': -1})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_parent_category_is_current_returns_400(self, put_category, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response = put_category(category.id, {'name': category.name, 'parent_category': category.id})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_parent_category_is_son_returns_400(self, put_category, authenticate):
#         authenticate(is_staff=True)
#         parent_category = baker.make(Category)
#         category = baker.make(Category, parent_category=parent_category)
#         response = put_category(parent_category.id, {'name': 'a', 'parent_category': category.id})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_category_not_exists_returns_404(self, put_category, authenticate):
#         authenticate(is_staff=True)
#         response = put_category(9999, {'name': 'test'})
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_data_is_valid_returns_200(self, put_category, authenticate):
#         authenticate(is_staff=True)
#         category1 = baker.make(Category)
#         category2 = baker.make(Category)
#         response = put_category(category1.id, {'name': 't', 'parent_category': category2.id})
#         assert response.status_code == status.HTTP_200_OK


# @pytest.mark.django_db
# class TestPatchCategory:
#     def test_if_user_is_anonymous_returns_401(self, patch_category):
#         category = baker.make(Category)
#         response = patch_category(category.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_401_UNAUTHORIZED

#     def test_if_user_is_not_admin_returns_403(self, patch_category, authenticate):
#         authenticate()
#         category = baker.make(Category)
#         response = patch_category(category.id, {'name': 'a'})
#         assert response.status_code == status.HTTP_403_FORBIDDEN

#     def test_if_parent_category_not_exists_returns_400(self, patch_category, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response = patch_category(category.id, {'name': 'a', 'parent_category': -1})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_parent_category_is_current_returns_400(self, patch_category, authenticate):
#         authenticate(is_staff=True)
#         category = baker.make(Category)
#         response = patch_category(category.id, {'parent_category': category.id})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_parent_category_is_son_returns_400(self, patch_category, authenticate):
#         authenticate(is_staff=True)
#         parent_category = baker.make(Category)
#         category = baker.make(Category, parent_category=parent_category)
#         response = patch_category(parent_category.id, {'name': 'a', 'parent_category': category.id})
#         assert response.status_code == status.HTTP_400_BAD_REQUEST

#     def test_if_category_not_exists_returns_404(self, patch_category, authenticate):
#         authenticate(is_staff=True)
#         response = patch_category(-1, {'name': 'test'})
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_data_is_valid_returns_200(self, patch_category, authenticate):
#         authenticate(is_staff=True)
#         category1 = baker.make(Category)
#         category2 = baker.make(Category)
#         response1 = patch_category(category1.id, {'name': 't'})
#         response2 = patch_category(category1.id, {'parent_category': category2.id})
#         assert response1.status_code == response2.status_code == status.HTTP_200_OK


# @pytest.mark.django_db
# class TestRetrieveCategory:
#     def test_if_category_not_exists_returns_404(self, api_client):
#         response = api_client.get('/store/categories/-1/')
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     def test_if_category_exists_returns_200(self, api_client):
#         category = baker.make(Category)
#         response = api_client.get(f'/store/categories/{category.id}/')
#         assert response.status_code == status.HTTP_200_OK

#     def test_if_get_categories_returns_200(self, api_client):
#         response = api_client.get('/store/categories/')
#         assert response.status_code == status.HTTP_200_OK