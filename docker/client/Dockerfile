FROM node:16.18-alpine3.16

RUN apk --no-cache update && \
    apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && apk del tzdata \
    && rm -rf /var/cache/apk/*

RUN apk --no-cache update && \
    apk --no-cache add \
    bash \
    git \
  && rm -rf /var/cache/apk/*
