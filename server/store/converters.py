# from django.urls import converters
# from .models import Customer

# class CustomerIDConverter(converters.StringConverter):
#     def to_python(self, value: str) -> str:
#         if value == 'me':
#             return Customer.objects.only('id').get(pk=self.request.user.id)
#         return super().to_python(value)
    