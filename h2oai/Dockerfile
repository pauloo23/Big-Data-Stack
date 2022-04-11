########################################################################
# Dockerfile for Oracle JDK 8 on Ubuntu 16.04
########################################################################

# pull base image
FROM ubuntu:16.04

RUN \
    echo 'DPkg::Post-Invoke {"/bin/rm -f /var/cache/apt/archives/*.deb || true";};' | tee /etc/apt/apt.conf.d/no-cache && \
    echo "deb http://mirror.math.princeton.edu/pub/ubuntu xenial main universe" >> /etc/apt/sources.list && \
    apt-get update -q -y && \
    apt-get dist-upgrade -y && \
    apt-get clean && \
    rm -rf /var/cache/apt/* && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y wget unzip openjdk-8-jdk python-pip python-sklearn python-pandas python-numpy python-matplotlib software-properties-common python-software-properties && \
    apt-get clean

# Fetch h2o
ENV H2O_RELEASE rel-zipf
ENV H2O_VERSION 3.32.1.6
RUN \
    wget http://h2o-release.s3.amazonaws.com/h2o/${H2O_RELEASE}/$(echo $H2O_VERSION | cut -d "." -f4)/h2o-${H2O_VERSION}.zip -O /opt/h2o.zip && \
    unzip -d /opt /opt/h2o.zip && \
    rm /opt/h2o.zip && \
    cd /opt && \
    cd `find . -name 'h2o.jar' | sed 's/.\///;s/\/h2o.jar//g'` && \
    cp h2o.jar /opt && \
    /usr/bin/pip install `find . -name "*.whl"`


RUN pip install psutil

# Define the working directory
WORKDIR \
    /home/h2o

# Define default command
COPY ./bin/entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]