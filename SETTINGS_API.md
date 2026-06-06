# Settings API

**Base URL:** `https://demo.togaar.com/api`  
**Auth:** All endpoints require `Authorization: Bearer <token>`

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/settings/profile` | Get personal profile |
| `PUT` | `/settings/profile` | Update personal profile |
| `GET` | `/settings/company` | Get company info |
| `PUT` | `/settings/company` | Update company info |
| `GET` | `/billing/plans` | Get available billing plans |
| `GET` | `/billing/invoices` | List invoices (paginated) |
| `GET` | `/billing/invoices/:id/download` | Download invoice as PDF |

---

## 1. GET /settings/profile

### Response `200`

```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "avatarUrl": "string | null"
}
```

---

## 2. PUT /settings/profile

**Content-Type:** `multipart/form-data`

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fullName` | string | ❌ | Display name |
| `email` | string | ❌ | Login email |
| `phone` | string | ❌ | Phone number with country dial code |
| `password` | string | ❌ | New password — omit to keep current |
| `avatar` | File | ❌ | Profile picture (PNG, JPG) |

### Response `200`

```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "avatarUrl": "string | null"
}
```

### Error Responses

| Status | Body |
|--------|------|
| `409` | `{ "error": "Email already in use" }` |

---

## 3. GET /settings/company

### Response `200`

```json
{
  "companyName": "string",
  "companyEmail": "string",
  "phone": "string",
  "landline": "string",
  "address": "string",
  "website": "string",
  "logoUrl": "string | null",
  "commercialRegisterUrl": "string | null",
  "taxCardUrl": "string | null"
}
```

---

## 4. PUT /settings/company

**Content-Type:** `multipart/form-data`

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `companyName` | string | ❌ | Legal company name |
| `companyEmail` | string | ❌ | Official contact email |
| `phone` | string | ❌ | Mobile with country dial code |
| `landline` | string | ❌ | Landline with country dial code |
| `address` | string | ❌ | Physical address |
| `website` | string | ❌ | Company website URL |
| `logo` | File | ❌ | Company logo (PNG, JPG, SVG) |
| `commercialRegister` | File | ❌ | Commercial registration document (PDF, DOCX) |
| `taxCard` | File | ❌ | Tax card document (PDF, DOCX) |

### Response `200`

```json
{
  "companyName": "string",
  "companyEmail": "string",
  "phone": "string",
  "landline": "string",
  "address": "string",
  "website": "string",
  "logoUrl": "string | null",
  "commercialRegisterUrl": "string | null",
  "taxCardUrl": "string | null"
}
```

---

## 5. GET /billing/plans

### Response `200`

```json
{
  "plans": [
    {
      "id": "string",
      "name": "string",
      "tier": "string",
      "price": "string",
      "description": "string",
      "features": ["string"],
      "cta": "string",
      "active": true,
      "renewalDate": "string | null"
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `active` | `true` for the user's current plan, `false` for others |
| `renewalDate` | Present only when `active: true` — formatted date string |
| `price` | Empty string for free tier |

---

## 6. GET /billing/invoices

### Query Parameters

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `page` | number | ❌ | `1` | Page number |
| `limit` | number | ❌ | `4` | Results per page |

### Response `200`

```json
{
  "invoices": [
    {
      "id": "string",
      "date": "string",
      "plan": "string",
      "amount": 0.00,
      "period": "string",
      "status": "Paid | Pending | Failed"
    }
  ],
  "total": 0,
  "page": 1,
  "limit": 4
}
```

| Field | Description |
|-------|-------------|
| `date` | Issue date (e.g. `"20 Nov 2026"`) |
| `period` | Billing period description |
| `status` | `"Paid"` · `"Pending"` · `"Failed"` |

---

## 7. GET /billing/invoices/:id/download

Returns the invoice as a binary PDF stream.

### Response `200`

Binary file stream (`Content-Type: application/pdf`)

### Error Responses

| Status | Body |
|--------|------|
| `404` | `{ "error": "Invoice not found" }` |
