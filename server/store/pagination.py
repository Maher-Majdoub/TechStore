from rest_framework.pagination import PageNumberPagination

class NoLimitPagination(PageNumberPagination):
    page_size = 1000
