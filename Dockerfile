FROM ubuntu:16.04
RUN apt-get update && apt-get install -y
RUN  apt-get install -y python3.9 
RUN mkdir -p /data/test
WORKDIR /data/test
COPY caes.py /data/test
CMD python3 caes.py
