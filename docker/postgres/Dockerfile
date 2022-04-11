FROM timescale/timescaledb:2.4.0-pg13
COPY *.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/*.sh
EXPOSE 5432