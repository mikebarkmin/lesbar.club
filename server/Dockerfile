FROM tiangolo/meinheld-gunicorn-flask:python3.7

COPY . /app
RUN mkdir /usr/local/lib/python3.7/ClassifierBasedGermanTagger
RUN touch /usr/local/lib/python3.7/ClassifierBasedGermanTagger/__init__.py
RUN wget https://raw.githubusercontent.com/mikebarkmin/NLTK-Contributions/master/ClassifierBasedGermanTagger/ClassifierBasedGermanTagger.py
RUN mv ClassifierBasedGermanTagger.py /usr/local/lib/python3.7/ClassifierBasedGermanTagger/

RUN pip install pipenv
RUN pipenv install --system

RUN python nltk_install.py
