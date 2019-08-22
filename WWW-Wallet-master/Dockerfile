FROM php:7.2-apache

RUN apt-get update &&\
    apt-get install dialog apt-utils -y &&\
    apt-get install curl -y &&\
    curl -sL https://deb.nodesource.com/setup_4.x | bash - &&\
    mkdir -p /usr/share/man/man1 &&\
    apt-get install nodejs npm python make g++ git libcurl4-openssl-dev libc-client-dev libkrb5-dev autoconf default-jre-headless cron p7zip-full vim zlib1g-dev libpng-dev -y &&\
    npm --global install yarn &&\
    yarn global add n &&\
    n stable &&\
    ln -sf /usr/local/bin/node /usr/bin/node &&\
    npm install npm@5.8.0 -g &&\
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer &&\
    docker-php-ext-configure gd --with-png-dir=/usr/include/ && \
    docker-php-ext-install -j$(nproc) gd &&\
    docker-php-ext-install pdo_mysql curl opcache zip &&\
    cd /etc/apache2/mods-enabled &&\
    ln -s ../mods-available/rewrite.load ./ &&\
    ln -s /dev/stdout /var/log/apache2/access_atslp.log &&\
    ln -s /dev/stdout /var/log/apache2/access_crmlp.log &&\
    ln -s /dev/stdout /var/log/apache2/access_firstlp.log &&\
    ln -s /dev/stdout /var/log/apache2/access_top.log &&\
    ln -s /dev/stderr /var/log/apache2/error_atslp.log &&\
    ln -s /dev/stderr /var/log/apache2/error_crmlp.log &&\
    ln -s /dev/stderr /var/log/apache2/error_firstlp.log &&\
    ln -s /dev/stderr /var/log/apache2/error_top.log

COPY ./docker/release/apache2.conf /etc/apache2/apache2.conf
COPY ./docker/release/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./docker/release/run.sh /usr/local/bin/run.sh
RUN echo '* * * * * www-data /usr/local/bin/php /var/www/localhost/htdocs/artisan schedule:run >> /dev/null 2>&1' >> /etc/crontab
RUN chmod 755 /usr/local/bin/run.sh

WORKDIR /var/www/localhost/htdocs

EXPOSE 80

CMD ["/usr/local/bin/run.sh"]
