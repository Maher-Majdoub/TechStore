FROM python:3.10-alpine3.18
# RUN addgroup server && \
#     adduser -SG server server
# USER server
WORKDIR /server
RUN apk add --no-cache mariadb-dev build-base
COPY requirements.txt .
COPY requirements-dev.txt .
RUN pip install -r requirements.txt
RUN pip install -r requirements-dev.txt
RUN apk del mariadb-dev build-base
COPY . .
EXPOSE 8000
CMD python manage.py migrate && python manage.py seed_db && python manage.py runserver 0.0.0.0:8000