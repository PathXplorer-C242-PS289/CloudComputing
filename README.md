# This is Cloud Computing repository of PAthXplorer

# pathXplorer API Documentation

## Authentication

### User Authentication

#### POST /register
`https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com//api/auth/register`

**Body:**
```json
{
    "email": "xplorerpath@gmail.com",
    "password": "ovlfxnlrjqwkwzql"
}
```
**Example:**
```bash
curl --location 'http://localhost:3000/api/auth/register' \
--data-raw '{
    "email": "admin@example.com",
    "password": "password"
}'
```

#### POST /verify-register
`https://backend-v3-dot-pathxplorer-442211.et.r.appspot.com//api/auth/verify`

**Body:**
```
{
    "email": "c296b4ky0797@bangkit.academy",
    "otp": "755596"
}
```
