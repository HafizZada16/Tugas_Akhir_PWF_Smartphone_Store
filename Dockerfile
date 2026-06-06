FROM php:8.3-cli

# Install dependensi sistem, PostgreSQL driver, dan Node.js
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    curl \
    nodejs \
    npm

# Install ekstensi PHP untuk PostgreSQL
RUN docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy seluruh file project
COPY . /app

# Install dependensi PHP
RUN composer install --optimize-autoloader --no-dev

# Install dependensi Node.js & Compile CSS/JS (Vite)
RUN npm install
RUN npm run build

# Beri akses folder cache dan storage
RUN chmod -R 777 storage bootstrap/cache

# Buka port 8080
EXPOSE 8080

# Jalankan server bawaan Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
