# Inventory Management API

API ini adalah sistem sederhana untuk mengelola kategori dan item dalam inventaris. API dibangun menggunakan Node.js tanpa framework web tingkat tinggi. Mendukung operasi CRUD untuk kategori dan item, dengan hubungan satu ke banyak antara keduanya.

## Fitur

- **Manajemen Kategori:**
  - `GET /categories`: Mengambil daftar semua kategori.
  - `POST /categories`: Membuat kategori baru.
  
- **Manajemen Item:**
  - `GET /items`: Mengambil daftar semua item, termasuk informasi kategori mereka.
  - `GET /items/{id}`: Mengambil detail item tertentu berdasarkan ID-nya.
  - `POST /items`: Membuat item baru dan mengaitkannya dengan kategori.
  - `PUT /items/{id}`: Memperbarui item yang sudah ada.
  - `DELETE /items/{id}`: Menghapus item.

## Dokumentasi

Dokumentasi API dapat ditemukan di file `docs-api.yaml` yang terletak di root proyek. File ini mengikuti spesifikasi OpenAPI (Swagger).

Untuk melihat dokumentasi, Anda dapat menggunakan viewer atau editor Swagger apapun (seperti Swagger Editor di `https://editor.swagger.io`).

## Koleksi Postman

Anda dapat mengimpor koleksi Postman dan berinteraksi dengan API menggunakan opsi berikut:

Klik tombol "Run In Postman" di bawah untuk langsung membuka koleksi di Postman.

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/35101409-0b2b0658-4d45-4b59-ac59-3c159bf118fc?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D35101409-0b2b0658-4d45-4b59-ac59-3c159bf118fc%26entityType%3Dcollection%26workspaceId%3D80e0a50e-822c-4736-aab4-be3edb66090f)

Atau, Anda dapat membuka koleksi Postman menggunakan tautan berikut:  
[Open Postman Collection](https://elements.getpostman.com/redirect?entityId=35101409-0b2b0658-4d45-4b59-ac59-3c159bf118fc&entityType=collection)

## Dokumentasi Postman

Anda juga dapat melihat dokumentasi Postman yang lebih rinci di tautan berikut:  
[Postman API Documentation](https://documenter.getpostman.com/view/35101409/2sAXxJguLD)

## Cara Menjalankan

1. Clone repository:
   ```bash
   git clone https://github.com/Jenien/pretest-api.git
   ```
   
2. Instal dependensi:
   ```bash
   npm install
   ```
   
3. Konfigurasi koneksi MySQL database di proyek.

4. Jalankan server:
   ```bash
   node server.js
   ```
