# Dokumentasi RESTful API (Tugas Akhir PWF)

Aplikasi ini menyediakan REST API lengkap untuk mengelola resource Produk (`/api/products`). 
API ini cocok untuk diintegrasikan dengan aplikasi *mobile* atau *frontend* terpisah (Vue/React).

**Base URL:** `http://127.0.0.1:8000/api`

---

## 1. Mendapatkan Semua Produk
Mengambil daftar semua produk beserta relasi kategorinya.

- **URL:** `/products`
- **Method:** `GET`
- **Response Success (200 OK):**
```json
[
  {
    "id": 1,
    "category_id": 2,
    "name": "Xiaomi 14",
    "description": "...",
    "price": "11999000.00",
    "stock": 50,
    "image": "...",
    "created_at": "2026-06-05T10:00:00.000000Z",
    "updated_at": "2026-06-05T10:00:00.000000Z",
    "category": {
      "id": 2,
      "name": "Mobiles"
    }
  }
]
```

---

## 2. Mendapatkan Detail 1 Produk
Mengambil detail satu produk berdasarkan ID.

- **URL:** `/products/{id}`
- **Method:** `GET`
- **Response Success (200 OK):**
```json
{
  "id": 1,
  "category_id": 2,
  "name": "Xiaomi 14",
  "price": "11999000.00",
  ...
}
```
- **Response Error (404 Not Found):** Jika ID tidak ditemukan.

---

## 3. Menambahkan Produk Baru
Menyimpan data produk baru ke dalam database.

- **URL:** `/products`
- **Method:** `POST`
- **Headers:** 
  - `Accept: application/json`
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "category_id": 1,
  "name": "POCO X6 Pro",
  "description": "HP Gaming ngebut 2026",
  "price": 4999000,
  "stock": 100,
  "image": "https://example.com/poco.jpg"
}
```
- **Response Success (201 Created):** Mengembalikan data JSON produk yang baru dibuat.
- **Response Error (422 Unprocessable Entity):** Jika terjadi kesalahan validasi (misal: harga kurang dari 0 atau nama kosong).

---

## 4. Memperbarui Data Produk
Mengubah data produk yang sudah ada di database.

- **URL:** `/products/{id}`
- **Method:** `PUT` atau `PATCH`
- **Headers:** 
  - `Accept: application/json`
  - `Content-Type: application/json`
- **Body (JSON):** (sama seperti `POST`)
- **Response Success (200 OK):** Mengembalikan data JSON produk yang baru saja diperbarui.

---

## 5. Menghapus Produk
Menghapus produk dari database berdasarkan ID.

- **URL:** `/products/{id}`
- **Method:** `DELETE`
- **Response Success (204 No Content):** Tidak mengembalikan *body* (kosong), hanya status kode 204 yang menandakan penghapusan berhasil.

---

### Tips Pengujian (Praktikum)
Untuk menguji API di atas, Anda dapat menggunakan aplikasi API Client seperti **Postman**, **Insomnia**, atau ekstensi VS Code bernama **Thunder Client**.
Pastikan Anda selalu menyertakan *header* `Accept: application/json` saat melakukan *request* `POST` dan `PUT` agar respon *error* validasi dari Laravel dikembalikan dalam bentuk JSON (bukan dialihkan ke halaman HTML).
