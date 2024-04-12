FROM php:8.0-fpm-alpine3.16

RUN apk --no-cache update && \
    apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && apk del tzdata \
    && rm -rf /var/cache/apk/*

RUN apk --no-cache update && \
    apk --no-cache add \
    curl-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libxml2-dev \
    zlib-dev \
    libzip \
    libzip-dev \
    pcre-dev \
    g++ \
    gcc \
    make \
    autoconf \
    openssl \
    bash \
    oniguruma-dev \
    git \
  && rm -rf /var/cache/apk/*

RUN docker-php-ext-install \
    curl \
    dom \
    mbstring \
    pdo \
    pdo_mysql \
    zip \
    opcache \
    exif \
    bcmath

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
 && php composer-setup.php \
 && php -r "unlink('composer-setup.php');" \
 && mv composer.phar /usr/local/bin/composer

COPY php.ini /usr/local/etc/php/
