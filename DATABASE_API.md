# Database / Documents API

**Base URL:** `https://demo.togaar.com/api`  
**Auth:** All endpoints require `Authorization: Bearer <token>`

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/documents` | List documents by category |
| `POST` | `/documents/upload` | Upload one or more files |
| `DELETE` | `/documents/:id` | Delete a document |
| `GET` | `/documents/:id/view` | Stream a document (view / download) |

---

## Document Categories

| Value | Description |
|-------|-------------|
| `cv_resume` | CV / Resume files |
| `rfp` | RFP (Request for Proposal) documents |
| `boq` | BOQ (Bill of Quantities) documents |
| `portfolio` | Portfolio files |
| `certifications` | Certificates and registrations |
| `team` | Team / company profile documents |
| `company_doc` | Company documents (used in proposal modal) |

---

## 1. GET /documents

### Query Parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | string | ❌ | Filter by category (see table above). Omit to return all. |

### Response `200`

```json
{
  "documents": [
    {
      "id": "string",
      "name": "string",
      "category": "cv_resume | rfp | boq | portfolio | certifications | team | company_doc",
      "url": "string",
      "createdAt": "ISO 8601"
    }
  ],
  "total": 0
}
```

---

## 2. POST /documents/upload

**Content-Type:** `multipart/form-data`

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | string | ✅ | Category to file the documents under (see category table) |
| `files` | File[] | ✅ | One or more files (PDF, DOCX, DOC, TXT, JPG, PNG) |

### Response `200`

Returns the created document objects.

```json
{
  "documents": [
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "url": "string",
      "createdAt": "ISO 8601"
    }
  ],
  "total": 1
}
```

### Error Responses

| Status | Body |
|--------|------|
| `400` | `{ "error": "string" }` |
| `401` | `{ "error": "Unauthorized" }` |

---

## 3. DELETE /documents/:id

### Response `200`

```json
{ "ok": true }
```

### Error Responses

| Status | Body |
|--------|------|
| `404` | `{ "error": "Document not found" }` |

---

## 4. GET /documents/:id/view

Streams the file content. Used for both in-browser viewing and downloading.

### Response `200`

Binary file stream with appropriate `Content-Type` header.

### Error Responses

| Status | Body |
|--------|------|
| `404` | `{ "error": "Document not found" }` |
