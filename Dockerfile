FROM python:3.11-slim

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

CMD [ "sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:9000" ]