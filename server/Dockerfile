FROM tiangolo/meinheld-gunicorn-flask:python3.7

COPY . /app

RUN pip install pipenv
RUN pipenv install --system

RUN python nltk_install.py
