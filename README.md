# This is Cloud Computing repository of PathXplorer ----

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
`https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com/api/auth/verify`

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
`https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com/api/auth/login`

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

#### **POST /forgot-password**  
**URL:** `http://localhost:3000/api/auth/forgot-password`

**Body:**  
```json
{
  "email": "user@example.com"
}
```
**Example:**
```json
curl --location 'http://localhost:3000/api/auth/forgot-password' \
--data-raw '{
  "email": "admin@example.com"
}'
```
**Response:**
```json
{
  "message": "OTP sent, please check your email"
}
```

#### **POST /verify-reset-password**
**URL:** `http://localhost:3000/api/auth/verify-otp`

**Body:**
```json
{
    "email": "admin@example.com",
    "otp": "508891"
}
```

**Example:**
```json
curl --location 'http://localhost:3000/api/auth/verify-otp' \
--data-raw '{
    "email": "admin@example.com",
    "otp": "508891"
}'
```

#### **POST /reset-password**
**URL:** `http://localhost:3000/api/auth/reset-password`

**Body:**
```json
{
    "email": "admin@example.com",
    "otp": "508891",
    "newPassword": "password123"
}
```

**Example:**
```json
curl --location 'http://localhost:3000/api/auth/reset-password' \
--data-raw '{
    "email": "admin@example.com",
    "otp": "123456",
    "newPassword": "passwordbaru"
}'
```

**Response:**
```json
{
    "message": "Password successfully reset"
}
```

#### **POST /logout**
**URL:** `https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com//api/auth/logout`

**Request Headers**
```
Authorization: Bearer <token>
```

**Example:**
```json
curl --location --request POST 'http://localhost:3000/api/auth/logout?Authorization=Bearer%20%3Ctoken%3E'
```

**Response:**
```json
{
    "message": "Successfully logged out"
}
```

### Profile

#### **GET /profile**
**URL:** `https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com//api/profile/`

**Request Headers**
```
Authorization: Bearer <token>
```

**Example:**
```json
curl --location ''
```

**Response:**
```json
{
    "success": true,
    "data": {
        "user_id": 3,
        "email": "user2@example.com",
        "verified_at": "2024-12-09T10:33:55.000Z",
        "testResults": [
            {
                "test_id": 4,
                "category": "R",
                "timestamp": "2024-12-03T05:00:00.000Z",
                "riasec_type": "R",
                "interest_description": "Individuals with the Realistic type are those who enjoy practical, tangible work. They like working with their hands, making, fixing or assembling things, and are often drawn to outdoor activities. This type usually enjoys using tools or machines, building something concrete, or even farming. If you are a Realistic type, you may find satisfaction in a job that allows you to see the immediate results of your efforts. You tend to like working independently or in a structured environment with little social interaction.",
                "key_skills": "Operating tools, repairing, designing, manual work, driving, caring for plants or animals.",
                "example_careers": "Pilot, Farmer, Engineer, Mechanic"
            }
        ]
    }
}
```

#### **PUT /update-profile**
**URL:** `http://localhost:3000/api/profile/update`

**Request Headers**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "email": "user@example.com",
  "username": "user1",
  "password": "password"
}
```

**Example:**
```json
curl --location ''
```

**Response:**
```json

```

### RIASEC

#### **POST /save**
**URL:** `https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com/api/riasec/save-results`

**Body:**
```json
{
  "testId": 1,
  "userId": 1,
  "category": "R",
  "timestamp": "2024-12-03T12:00:00"
}

```

**Example:**
```json

```

**Response:**
```json
{
    "message": "Test result saved successfully"
}
```

#### **GET /result**
**URL:** `https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com/api/riasec/test-results/:testId`

**Path Variables:**
```
testId
```

**Response:**
```json
{
    "test_id": 1,
    "user_id": 2,
    "category": "C",
    "timestamp": "2024-12-03T05:00:00.000Z"
}
```

#### **GET /get recommendation**
**URL:** `https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com/api/riasec/recommendation/:category`

**Response:**
```json
{
    "id": 1,
    "riasec_type": "R",
    "interest_description": "Individuals with the Realistic type are those who enjoy practical, tangible work. They like working with their hands, making, fixing or assembling things, and are often drawn to outdoor activities. This type usually enjoys using tools or machines, building something concrete, or even farming. If you are a Realistic type, you may find satisfaction in a job that allows you to see the immediate results of your efforts. You tend to like working independently or in a structured environment with little social interaction.",
    "key_skills": "Operating tools, repairing, designing, manual work, driving, caring for plants or animals.",
    "example_careers": "Pilot, Farmer, Engineer, Mechanic"
}
```

#### ** /**
**URL:** ``

**Body:**
```json

```

**Example:**
```json

```

**Response:**
```json

```
