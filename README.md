# Secure Blog API

A secure blog API built with Node.js, Express, Mongoose, and JWT authentication.

## Features
- User management (signup, login, update, delete)
- Blog post management (create, read, update, delete)
- Role-Based Access Control (RBAC)
- Pagination for blog posts
- Input validation and sanitization
- Request logging

## Setup
1. Clone the repository:
   ```bash
   git clone <https://github.com/jishadaj/Secure_blog_api-s.git>
2. npm install 
3. Create a .env file in the root directory with the following variables:
 - PORT=4000
 - MONGODB_URI="mongodb+srv://ajjishad20:uQgll4DhW36kBo5D@cluster0.z5d5b.mongodb.net/secure-blog-api"
 - JWT_SECRET=secure_blog_api_aj
4. npm run dev

## Postman Collection
Import the Postman collection from `postman/Secure_Blog_API.postman_collection.json` to test the API endpoints.