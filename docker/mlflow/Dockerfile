FROM python:3.8.10

RUN apt-get update \
    && apt-get install -y --no-install-recommends cron \
    && apt-get autoremove -yqq --purge \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install \
    mlflow==1.17.0 \
    psycopg2-binary==2.9.1 \
    boto3==1.17.97

COPY gc-cron /etc/cron.d/gc-cron

RUN chmod +x /etc/cron.d/gc-cron

RUN crontab /etc/cron.d/gc-cron

RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log