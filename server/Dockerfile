FROM python:3.10-alpine
RUN addgroup server && \
    adduser -SG server server
USER server
WORKDIR /server
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]