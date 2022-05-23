# Entity Relationship Diagram
<!-- ![alt_text](https://github.com/fahthurdanu/codigram/) -->

# API Documentation

## Post Endpoints

`GET /posts`

    http://localhost:3000/posts

+ untuk mengambil semua post

`GET /posts/user/user_id`

    http://localhost:3000/posts/user/1

+ untuk mengambil semua post yang dimiliki oleh user tertentu berdasarkan id user

`GET /posts/detail/post_id`

    http://localhost:3000/posts/detail/1

+ untuk mengambil suatu post berdasarkan id post

`POST /posts/create`

    http://localhost:3000/posts/create

+ Membuat post baru

`DELETE /posts/delete/id`

    http://localhost:3000/posts/delete/1

+ Menghapus post berdasarkan id post

`PUT /posts/update/id`

    http://localhost:3000/posts/update/1

+ Mengedit post berdasarkan id post

`PUT /posts/update/id`

    http://localhost:3000/posts/like/1

+ Membuat/menghapus like berdasarkan id post


## User Endpoints

`GET /users/user_id`

    http://localhost:3000/users/1

+ Mengambil informasi user

`POST /users/register`

    http://localhost:3000/users/register

+ Membuat akun user baru

`POST /users/login`

    http://localhost:3000/posts/login

+ Login untuk mendapatkan access_token