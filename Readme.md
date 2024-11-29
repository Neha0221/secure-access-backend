# **Secure Access Manager**

## **Project Overview**

This Node.js project implements a secure **Role-Based Access Control (RBAC)** system that enforces authentication and authorization to control access to endpoints, based on user roles.

The project supports three predefined user roles:

- `User` (Default)
- `Admin`
- `Moderator`

Key features of this project include:

1. **User Authentication** using JWT (JSON Web Tokens)
2. **Authorization** to protect endpoints by user roles
3. Flexible **RBAC** implementation for assigning permissions to users dynamically
4. Future extensibility for adding permissions to specific models (posts, categories, etc.)

---

## **Project Structure**

The project has a modular folder structure:

```
├── config
│   └── db.js                   # Database configuration
├── controllers
│   ├── admin/
│   │   ├── permissionController.js     # Manage permissions
│   │   └── roleController.js           # Manage roles
│   ├── authController.js               # Authentication logic (register/login/logout)
│   ├── categoryController.js           # Manage categories
│   ├── postController.js               # Manage posts
│   └── userController.js               # Profile & user management
├── helpers
│   ├── adminValidator.js               # Validation for admin-related functions
│   └── validator.js                    # General validation helpers
├── middlewares
│   ├── accessMiddleware.js             # Role-based access middleware
│   └── authMiddleware.js               # Authentication middleware
├── models
│   ├── categoryModel.js                # Categories model
│   ├── commentModel.js                 # Comments model
│   ├── likeModel.js                    # Likes model
│   ├── permissionModel.js              # Permissions model
│   ├── postModel.js                    # Posts model
│   ├── roleModel.js                    # Roles model
│   ├── userModel.js                    # Users model
│   └── userPermissionModel.js          # User-specific permissions
├── routes
│   ├── adminRoute.js                   # Admin-specific routes
│   ├── authRoute.js                    # Auth routes (Register/Login)
│   └── commonRoute.js                  # General routes (Posts, Categories)
└── server.js                           # Application entry point
```

---

## **Instructions to Run the Project**

### **1. Prerequisites**

Ensure you have the following tools installed on your machine:

- Node.js (v14+)
- MongoDB (local or a connection URI)
- Postman (optional, for API testing)

### **2. Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/Neha0221/secure-access-backend
   cd secure-access-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following keys:

   ```
   PORT=8001
   MONGO_URI=<YOUR_MONGODB_URI>
   ACCESS_SECRET_TOKEN=<YOUR_SECRET_KEY>
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. Access the application at `http://localhost:8001`.

6. Import Secure Access Manager.postman_collection.json into postman to test the API endpoints.

---

## **API Demonstration**

### **Authentication APIs**

#### 1. **User Registration**

**Endpoint:**

```http
POST /api/register
```

**Payload:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "status": true,
  "msg": "Registered successfully",
  "data": {
    "_id": "64aae1f8a5ae3e3e5e000001",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": 0
  }
}
```

#### 2. **User Login**

**Endpoint:**

```http
POST /api/login
```

**Payload:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "msg": "Login Successfully!",
  "accessToken": "<JWT_TOKEN>",
  "tokenType": "Bearer",
  "data": {
    "_id": "64aae1f8a5ae3e3e5e000001",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": 0
  }
}
```

#### 3. **Profile Information**

**Endpoint:**

```http
GET /api/profile
```

**Headers:**

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Response:**

```json
{
  "success": true,
  "msg": "Profile Data",
  "data": {
    "_id": "64aae1f8a5ae3e3e5e000001",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": 0
  }
}
```

---

### **Role APIs**

**Roles supported:**

- `0` → User
- `1` → Admin
- `2` → Moderator

- I have implemented Role based Access Control via a middle ware accessMiddleWare..js
- It has function like onlyAdminAccess and moderatorAccess which provides access based on roles of the user
- Admin has full access to the routes. It can create new roles in future i.e. Roles will be dynamically made
- Moderator has access to all the routes except the admin only routes eg: Can access "GET /api/user"
- User will have access the common routes

#### 1. **Fetch All Roles (Accessed by Admin)**

**Endpoint:**

```http
GET /api/admin/role
```

**Headers:**

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64ashe1d90fas",
      "role_name": "Admin",
      "value": 1
    },
    {
      "_id": "64ashe1dc9asf",
      "role_name": "User",
      "value": 0
    },
    {
      "_id": "4ashe1dsdfsfd",
      "role_name": "Moderator",
      "value": 2
    }
  ]
}
```

#### 2. **Create a Role (Accessed by Admin)**

**Endpoint:**

```http
POST /api/admin/role
```

**Payload:**

```json
{
  "role_name": "moderator",
  "value": 2
}
```

**Response:**

```json
{
  "success": true,
  "msg": "Role Created Successfully",
  "data": {
    "role_name": "moderator",
    "value": 2,
    "_id": "6749619c8301d44279199751",
    "__v": 0
  }
}
```

---

### **User APIs**

#### 1. **Fetch All Users (Accessed by Admin and Moderator)**

**Endpoint:**

```http
GET /api/users
```

**Headers:**

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Headers:**

```json
{
  "success": true,
  "msg": "Users Fetched Successfully",
  "data": [
    {
      "_id": "67447252214dbac9bd1cc25a",
      "name": "Neha",
      "email": "neha@gmail.com",
      "role": 0, //User
      "__v": 0
    },
    {
      "_id": "6744732b214dbac9bd1cc25e",
      "name": "Admin",
      "email": "admin@gmail.com",
      "role": 1, // Admin
      "__v": 0
    },
    {
      "_id": "674955dff0aad36394d85b6d",
      "name": "Akshay Kumar",
      "email": "akshaykumar@gmail.com",
      "role": 0, //User
      "__v": 0
    },
    {
      "_id": "64aae1f8a5ae3e3e5e000001",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": 2, // Moderator
      "__v": 0
    }
  ]
}
```

- If someone without access say Akshy Kumar tries to hit the endpoint

**Response:**

```json
{
  "success": false,
  "msg": "You have not permission to access this route"
}
```

#### 2. **Update a User Role (Accessed by Admin)**

**Endpoint:**

```http
POST /api/admin/userrole
```

**Payload:**

```json
{
  "id": "674564280f0a922b73458692",
  "role": 2
}
```

**Response:**

```json
{
  "success": true,
  "msg": "Updated role Successfully",
  "data": {
    "_id": "674564280f0a922b73458692",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "$2b$10$A3oRXsHLkQgq0yeeq0qycuYpCvDCXl3Z3zh4m6YCIc83jaeLHJ4BK",
    "role": 2,
    "__v": 0
  }
}
```

### Future Enhancements

- Add granular permission assignment to models (`Post`, `Category`, etc.). Permission assigment can only happen by admin. I have added the CRUD operations of POST, Category, and Permissions but proper permission management is under development.

---

## **Evaluation Criteria**

### **1. Security Best Practices**

- **Password Hashing**:
  User passwords are hashed using **bcrypt** before being stored in the database, ensuring they’re not accessible in plain text.

- **JWT Authentication**:
  Each authenticated user session is managed using JWT tokens with secrets and an expiration time of 2 hours.

- **Middleware-driven Access Control**:
  Authentication and access validation are implemented via middleware (`authMiddleware.js` and `accessMiddleware.js`).

---

### **2. Role-Based Access Control (RBAC)**

- **User Role Definition**:
  Roles (`User`, `Admin`, `Moderator`) are pre-defined in the system and linked at the user level via the `role` field.

- **Middleware for Role Validation**:
  Role-based authorization is managed dynamically via `accessMiddleware.js`, ensuring only authorized users can access specific endpoints.

---

### **3. Code Quality**

- Modular structure that adheres to best practices.
- Controllers encapsulate business logic, making it easy to extend or reuse.
- Readable, well-documented code with validations and error handling.