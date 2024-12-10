# This is Cloud Computing repository of PAthXplorer

# pathXplorer API Documentation

## Authentication

### User Authentication

#### POST /register
`https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com//api/auth/register`

**Body:**
```json
{
    "email": "youremail@example.com",
    "password": "password"
}
```
**Example:**
```bash
curl --location 'http://localhost:3000/api/auth/register' \
--data-raw '{
    "email": "youremail@example.com",
    "password": "password"
}'
```

#### POST /verify-register
`https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com//api/auth/verify`

**Body:**
```
{
    "email": "youremail@example.com",
    "otp": "your-otp-digit"
}
```

**Example:**
```bash
curl --location 'http://localhost:3000/api/auth/verify' \
--data-raw '{
    "email": "youremail@example.com",
    "otp": "147569"
}'
```

#### POST /login
`https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com//api/auth/login`

**Body:**
```json
{
    "email": "youremail@example.com",
    "password": "password"
}

```
**Example:**
```bash
curl --location 'http://localhost:3000/api/auth/register' \
--data-raw '{
    "email": "youremail@example.com",
    "password": "password"
}'
```

**Response**
```
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpZCI6MiwiaWF0IjoxNzMzNzUxMDYyLCJleHAiOjE3MzM3NTQ2NjJ9.1zjbZQoizyWDjER1bomi8rBPJrEm5JwnblsMdrps2mE",
    "user": {
        "id": 2,
        "email": "user@example.com",
        "username": "user1",
        "provider_type": "manual"
    }
}
```

### **POST /forgot-password**  
**URL:** `http://localhost:3000/api/auth/forgot-password`

**Body:**  
```json
{
  "email": "user@example.com"
}
Example success request:
curl --location 'http://localhost:3000/api/auth/forgot-password' \
--data-raw '{
  "email": "admin@example.com"
}'
Response
{
  "message": "OTP sent, please check your email"
}
