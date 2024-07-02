FROM python:alpine3.20

COPY init.py init.py
COPY ./data /data

RUN pip install boto3

CMD [ "python", "./init.py" ]