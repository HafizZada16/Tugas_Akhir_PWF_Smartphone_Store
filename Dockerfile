# Menggunakan base image PHP 8.3
FROM php:8.3-cli

# Install dependensi sistem yang dibutuhkan Laravel & SQLite
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm \
    sqlite3 \
    libsqlite3-dev

# Bersihkan cache apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install ekstensi PHP (termasuk pdo_sqlite untuk database kita)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Atur working directory di dalam container
WORKDIR /app

# Salin semua file proyek ke dalam container
COPY . .

# Install dependensi PHP via Composer
RUN composer install --no-interaction --optimize-autoloader

# Install dependensi frontend (Tailwind/Vite) lalu build
RUN npm install
RUN npm run build

# Atur hak akses folder agar Laravel bisa menulis log/cache
RUN chown -R www-data:www-data /app \
    && chmod -R 775 /app/storage \
    && chmod -R 775 /app/bootstrap/cache

# Expose port 8000 untuk diakses dari luar container
EXPOSE 8000

# Perintah default saat container dijalankan (menjalankan server Laravel)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
