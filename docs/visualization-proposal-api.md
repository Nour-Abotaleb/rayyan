# Visualization Proposal — API Documentation

Base URL: `https://demo.togaar.com/api`  
All authenticated endpoints require `Authorization: Bearer <token>`.

---

## 1. Create Visualization Proposal

**POST** `/proposals/visualization`  
Content-Type: `multipart/form-data`

### Request Fields

| Field            | Type        | Required | Description                                                                      |
| ---------------- | ----------- | -------- | -------------------------------------------------------------------------------- |
| `clientName`     | string      | ✅       | Client organization name                                                         |
| `projectName`    | string      | ✅       | Name of the project                                                              |
| `sectorIndustry` | string      | ✅       | Industry sector (e.g. "Technology", "Government")                                |
| `language`       | string      | ✅       | Proposal language (e.g. "English", "Arabic")                                     |
| `startDate`      | string      | ❌       | Project start date `YYYY-MM-DD`                                                  |
| `endDate`        | string      | ❌       | Project end date `YYYY-MM-DD`                                                    |
| `projectManager` | string      | ✅       | Full name of the project manager                                                 |
| `technicalLead`  | string      | ✅       | Full name of the technical lead                                                  |
| `developers`     | JSON string | ✅       | Array of `{ name: string, position: string }`                                    |
| `skills`         | JSON string | ✅       | Array of `{ name: string, description: string, level: number }` — level is 0–100 |
| `phases`         | JSON string | ✅       | Array of `{ title: string, duration: string, description: string }`              |

### `developers` JSON structure

```json
[
  { "name": "Sara Nasser", "position": "Frontend Developer" },
  { "name": "Omar Faris", "position": "Backend Developer" }
]
```

### `skills` JSON structure

```json
[
  {
    "name": "Technical Skills",
    "description": "Robust B2B architecture delivery",
    "level": 95
  },
  {
    "name": "Communication",
    "description": "Stakeholder alignment",
    "level": 90
  },
  {
    "name": "Leadership",
    "description": "Product delivery from inception",
    "level": 85
  },
  {
    "name": "Problem Solving",
    "description": "Architectural bottleneck removal",
    "level": 70
  },
  {
    "name": "Project Management",
    "description": "Lifecycle orchestration",
    "level": 75
  },
  {
    "name": "Innovation",
    "description": "AI-driven workflow transformation",
    "level": 80
  }
]
```

### `phases` JSON structure

```json
[
  {
    "title": "Requirements & Discovery",
    "duration": "2 weeks",
    "description": "Stakeholder interviews and system mapping"
  },
  {
    "title": "Design & Architecture",
    "duration": "3 weeks",
    "description": "UI/UX design, API contracts, DB schema"
  },
  {
    "title": "Core Development",
    "duration": "6 weeks",
    "description": "Dashboard, map layers, API integrations"
  },
  {
    "title": "Testing & UAT",
    "duration": "2 weeks",
    "description": "QA cycles and user acceptance testing"
  },
  {
    "title": "Deployment & Handover",
    "duration": "1 week",
    "description": "Go-live, training, documentation"
  }
]
```

### Response `200 OK`

```json
{
  "jobId": "job_abc123",
  "estimatedSeconds": 30,
  "message": "Proposal generation started"
}
```

### Response `422 Unprocessable Entity`

```json
{
  "message": "Validation failed",
  "fields": {
    "clientName": "This field is required",
    "developers": null
  }
}
```

---

## 2. Poll Job Status

**GET** `/proposals/generate/{jobId}/status`

Shared across all proposal types. Poll every 3–5 seconds until `status` is `"completed"` or `"failed"`.

### Response

```json
{
  "status": "pending | processing | completed | failed",
  "proposalId": "PROP-994371-202",
  "message": "Optional status message"
}
```

| `status` value | Meaning                             |
| -------------- | ----------------------------------- |
| `pending`      | Queued, not started                 |
| `processing`   | AI generation in progress           |
| `completed`    | Done — `proposalId` is populated    |
| `failed`       | Generation failed — check `message` |

---

## 3. Get Parsed Proposal Data (for PDF preview)

**GET** `/ai/parsed-data/{proposalId}`

Returns the structured JSON used to render the PDF preview. Returns `404` while the proposal is still being processed (frontend polls until ready).

### Response `200 OK` — Visualization type

```json
{
  "id": "PROP-994371-202",
  "title": "Smart City Dashboard",
  "clientName": "Riyadh Municipality",
  "projectName": "Urban Data Visualization Platform",
  "sector": "Government",
  "language": "English",
  "startDate": "2026-09-01",
  "endDate": "2026-12-31",
  "type": "Visualization",
  "companyName": "Rayyan Solutions",
  "preparedBy": "Rayyan AI",
  "executiveSummary": "...",

  "teamStructure": {
    "projectManager": "Ahmed Khalid",
    "technicalLead": "Ali Mahmoud",
    "developers": [
      { "name": "Sara Nasser", "position": "Frontend Dev" },
      { "name": "Omar Faris", "position": "Backend Dev" }
    ]
  },

  "skillset": [
    { "name": "Technical Skills", "description": "...", "level": 95 },
    { "name": "Communication", "description": "...", "level": 90 }
  ],

  "phases": [
    {
      "title": "Requirements & Discovery",
      "duration": "2 weeks",
      "description": "..."
    },
    { "title": "Core Development", "duration": "6 weeks", "description": "..." }
  ]
}
```

### Response `200 OK` — Technical type

```json
{
  "id": "PROP-887234-101",
  "type": "Technical",
  "title": "...",
  "clientName": "...",
  "projectName": "...",
  "sector": "...",
  "language": "...",
  "startDate": "...",
  "endDate": "...",
  "executiveSummary": "...",
  "additionalDetails": "...",

  "sections": [
    {
      "title": "Administrative & Compliance",
      "chips": ["ISO 27001", "GDPR Compliance"],
      "content": "..."
    }
  ],

  "ganttCards": [
    { "title": "Requirements", "from": "2026-07-01", "to": "2026-07-20" }
  ],

  "team": [
    {
      "name": "Ahmad Al-Rashid",
      "role": "Project Manager",
      "yearsOfExperience": "12 years",
      "keySkills": "PMP, Agile"
    }
  ]
}
```

### Response `200 OK` — Financial type

```json
{
  "id": "PROP-551892-303",
  "type": "Financial",
  "title": "...",
  "clientName": "...",
  "projectName": "...",
  "sector": "...",
  "language": "...",
  "startDate": "...",
  "endDate": "...",
  "executiveSummary": "...",
  "boqType": "Fixed Price",
  "projectType": "Infrastructure",
  "taxRate": 15,
  "currency": "SAR",
  "totalAmount": 394000,
  "terms": "Payment due within 30 days...",

  "deliverables": [
    {
      "name": "Cloud Infrastructure Setup",
      "description": "AWS/Azure provisioning",
      "quantity": 1,
      "unit": "Project",
      "unitPrice": 85000,
      "subtotal": 85000
    }
  ],

  "paymentTerms": [
    {
      "title": "Project Kickoff",
      "percentage": 30,
      "dueDate": "2026-08-01",
      "amount": 118200
    }
  ]
}
```

### Response `404 Not Found`

```json
{ "message": "Proposal data not yet available" }
```

Frontend should retry with exponential back-off (default: every 4s, max 4 minutes).

---

## 4. List Proposals

**GET** `/proposals`

### Query Parameters

| Param    | Type   | Default | Description                                       |
| -------- | ------ | ------- | ------------------------------------------------- |
| `page`   | number | `1`     | Page number                                       |
| `limit`  | number | `20`    | Items per page                                    |
| `type`   | string | —       | Filter: `Technical`, `Financial`, `Visualization` |
| `search` | string | —       | Search by title                                   |

### Response

```json
{
  "proposals": [
    {
      "id": "PROP-994371-202",
      "title": "Digital Transformation Initiative",
      "description": "Short description...",
      "status": "Completed",
      "type": "Technical",
      "progress": 100,
      "startDate": "2026-07-01",
      "endDate": "2026-12-31",
      "createdAt": "2026-06-10T10:00:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

`status` values: `"Completed"` | `"Processing"` | `"Failed"`

---

## 5. Download Proposal PDF

**GET** `/proposals/{id}/download`

Returns binary PDF blob.  
Frontend creates an object URL and triggers a browser download as `proposal-{id}.pdf`.

---

## 6. Delete Proposal

**DELETE** `/proposals/{id}`

### Response

```json
{ "ok": true }
```

---

## Frontend Integration Map

| User action               | Endpoint                                                              |
| ------------------------- | --------------------------------------------------------------------- |
| Submit visualization form | `POST /proposals/visualization`                                       |
| Poll until ready          | `GET /proposals/generate/{jobId}/status`                              |
| Click "View Proposal"     | Navigates to `/dashboard/proposals/{id}` → `GET /ai/parsed-data/{id}` |
| Click "Download"          | `GET /proposals/{id}/download`                                        |
| Proposals list page       | `GET /proposals?page=1&type=Visualization`                            |
| Delete proposal           | `DELETE /proposals/{id}`                                              |

---

## Notes

- The `developers`, `skills`, and `phases` fields are sent as **JSON-stringified strings** inside `multipart/form-data` (same pattern as `deliverables` in the financial proposal).
- The `/ai/parsed-data/{id}` endpoint may return `404` for several minutes after `POST` completes — the frontend polls it every 4 seconds with a 4-minute timeout.
- Proposal IDs follow the format `PROP-{6digits}-{3digits}` (e.g. `PROP-994371-202`).
