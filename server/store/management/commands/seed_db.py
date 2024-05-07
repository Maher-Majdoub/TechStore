from django.core.management.base import BaseCommand
from django.db import connections
import os

class Command(BaseCommand):
    help = 'Seed the database'

    def run(self, script_path):
        with open(script_path, 'r') as file:
            sql_statements = file.read()
            with connections['default'].cursor() as cursor:
                try:
                    cursor.execute(sql_statements)
                    self.stdout.write(self.style.SUCCESS("Database seeded successfully."))
                except Exception as e:
                    self.stderr.write(self.style.ERROR(f"Error seeding database: {e}"))

    def handle(self, *args, **options):
        curr = os.path.dirname(os.path.realpath(__file__))
        print('seeding users.....')
        self.run(os.path.join(curr, 'sql/seed_users.sql'))
        print('seeding customers.....')
        self.run(os.path.join(curr, 'sql/seed_customers.sql'))
        print('seeding categories.....')
        self.run(os.path.join(curr, 'sql/seed_categories.sql'))
        print('seeding variations.....')
        self.run(os.path.join(curr, 'sql/seed_variations.sql'))
        print('seeding products....')
        self.run(os.path.join(curr, 'sql/seed_products.sql'))
        print('seeding products configuartions....')
        self.run(os.path.join(curr, 'sql/seed_product_configurations.sql'))
        print('seeding products images....')
        self.run(os.path.join(curr, 'sql/seed_product_image.sql'))
        print('seeding products infos....')
        self.run(os.path.join(curr, 'sql/seed_product_info.sql'))
        print('seeding tags....')
        self.run(os.path.join(curr, 'sql/seed_tags.sql'))
        print('seeding products tags....')
        self.run(os.path.join(curr, 'sql/seed_product_tag.sql'))


        