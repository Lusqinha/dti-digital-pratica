FROM nikolaik/python-nodejs

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN git clone https://github.com/Lusqinha/dti-digital-pratica.git

WORKDIR /dti-digital-pratica

RUN pip install -r requirements.txt

RUN cd api && python manage.py migrate && cd ..

RUN cd students-manager && yarn install

CMD ["sh", "-c", "cd students-manager && yarn dev & cd api && python manage.py runserver"]
