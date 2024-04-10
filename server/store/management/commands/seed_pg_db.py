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
        self.run(os.path.join(curr, 'postgreSql/seed_users.psql'))
        print('seeding categories.....')
        self.run(os.path.join(curr, 'postgreSql/seed_categories.psql'))
        print('seeding variations.....')
        self.run(os.path.join(curr, 'postgreSql/seed_variations.psql'))
        print('seeding products....')
        self.run(os.path.join(curr, 'postgreSql/seed_products.psql'))