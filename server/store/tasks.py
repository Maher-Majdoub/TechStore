from django.core.mail import BadHeaderError
from templated_mail.mail import BaseEmailMessage
from time import sleep
from celery import shared_task

@shared_task
def notify_customer(email):
    sleep(20)
    try:
        message = BaseEmailMessage(
            template_name='emails/hello.html',
        )
        message.send([email])
    except BadHeaderError:
        print('something went wrong')