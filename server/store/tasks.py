from django.core.mail import BadHeaderError
from templated_mail.mail import BaseEmailMessage
from celery import shared_task

@shared_task
def notify_customer(user, customer, order, total_price, order_items, shipping_adress, email):
    try:
        message = BaseEmailMessage(
            template_name = 'emails/order_confirm.html',
            context = {
                'user': user,
                'customer': customer,
                'order': order,
                'total_price': total_price,
                'shipping_adress': shipping_adress,
                'order_items': order_items,
            }
        )
        message.send([email])
    except BadHeaderError:
        print('something went wrong')