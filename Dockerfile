FROM php:8.3-cli
RUN apt-get update && apt-get install -y libpq-dev unzip curl nodejs npm
RUN docker-php-ext-install pdo pdo_pgsql
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY . /app
RUN composer install --optimize-autoloader --no-dev
RUN npm install
RUN npm run build
RUN chmod -R 777 storage bootstrap/cache
EXPOSE 8080
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
