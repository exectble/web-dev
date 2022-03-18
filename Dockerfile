FROM debian:latest
RUN apt update && apt -y upgrade
RUN apt install -y python3-pip
RUN mkdir -p /data/test
WORKDIR /data/test
COPY test.py /data/test
CMD python3 test.py
