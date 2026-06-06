# Proposals API

**Base URL:** `https://demo.togaar.com/api`  
**Auth:** All endpoints require `Authorization: Bearer <token>`

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/proposals/technical` | Create a technical proposal |
| `POST` | `/proposals/financial` | Create a financial proposal |
| `GET` | `/proposals` | List proposals (paginated) |
| `GET` | `/proposals/:id` | Get proposal detail |
| `DELETE` | `/proposals/:id` | Delete a proposal |
| `GET` | `/proposals/:id/download` | Download proposal as PDF |
| `GET` | `/dashboard/stats` | Proposal count stats |
| `GET` | `/:resource` | Dropdown option lists (see section 8) |

---

## 1. POST /proposals/technical

**Content-Type:** `multipart/form-data`

### Request Fields

**Basic Info**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `clientName` | string | ✅ | Client / organisation name |
| `projectName` | string | ✅ | Project name |
| `sectorIndustry` | string | ✅ | Sector or industry |
| `proposalType` | string | ✅ | Proposal sub-type (e.g. `"technical"`) |
| `language` | string | ✅ | Output language (e.g. `"Arabic"`, `"English"`, or any value from `GET /proposal-language`) |
| `startDate` | string (ISO 8601) | ❌ | Project start date |
| `endDate` | string (ISO 8601) | ❌ | Project end date |
| `additionalDetails` | string | ❌ | Free-text additional notes |

**RFP Documents**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rfpMode` | `"upload"` \| `"none"` | ✅ | `"upload"` if any RFP files or IDs are provided, otherwise `"none"` |
| `rfpFiles` | File[] | ❌ | RFP files uploaded from device |
| `rfpDocIds` | string[] | ❌ | IDs of RFP documents selected from the database |

**Timeline (Gantt Cards)**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ganttCards` | string (JSON) | ❌ | JSON-stringified array of milestone objects (see schema below) |
| `timelineFiles` | File[] | ❌ | Timeline attachment files |

`ganttCards` item schema:
```json
{
  "title": "string",     // milestone / phase name
  "from": "YYYY-MM-DD",  // start date
  "to":   "YYYY-MM-DD"   // end date
}
```

Example:
```json
[
  { "title": "Discovery",   "from": "2025-01-01", "to": "2025-01-21" },
  { "title": "Design",      "from": "2025-01-22", "to": "2025-02-18" },
  { "title": "Development", "from": "2025-02-19", "to": "2025-04-30" }
]
```

**Optional Sections**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sections` | string (JSON) | ❌ | JSON-stringified array of section objects (see schema below) |

`sections` item schema:
```json
{
  "title": "string",      // section title (e.g. "Admin & Compliance")
  "chips": ["string"]     // list of items within that section
}
```

Example:
```json
[
  { "title": "Admin & Compliance",         "chips": ["ISO 9001", "Risk Register"] },
  { "title": "Technical Methodology",      "chips": ["Agile", "Sprint Planning"] },
  { "title": "Management & Resources",     "chips": ["PM Lead", "QA Engineer"] }
]
```

**Team Members**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `members` | string (JSON) | ❌ | JSON-stringified array of team member objects (see schema below) |
| `memberCvFiles` | File[] | ❌ | CV files — same order as `members` array (index 0 → member 0) |
| `cvDocIds` | string[] | ❌ | IDs of CV documents selected from the database |

`members` item schema:
```json
{
  "name":              "string",
  "role":              "string",
  "yearsOfExperience": "string",
  "keySkills":         "string"
}
```

### Response `200`

```json
{
  "proposalId": "string",
  "status": "Processing",
  "message": "string"
}
```

### Error Responses

| Status | Body |
|--------|------|
| `400` | `{ "error": "string" }` |
| `401` | `{ "error": "Unauthorized" }` |

---

## 2. POST /proposals/financial

**Content-Type:** `multipart/form-data`

### Request Fields

**RFP Documents**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rfpMode` | `"upload"` \| `"none"` | ✅ | `"upload"` if any RFP files or IDs are provided |
| `rfpFiles` | File[] | ❌ | RFP files uploaded from device |
| `rfpDocIds` | string[] | ❌ | IDs of RFP documents from database |

**Project Info**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `clientName` | string | ✅ | Client / organisation name |
| `projectName` | string | ✅ | Project name |
| `numDeliverables` | number | ✅ | Total number of deliverables |
| `boqType` | string | ✅ | BOQ type (value from `GET /boq-type`) |
| `projectType` | string | ✅ | Project type (value from `GET /project-type`) |
| `sectorIndustry` | string | ✅ | Sector / industry (value from `GET /sector-industry`) |
| `language` | string | ✅ | Output language (value from `GET /proposal-language`) |
| `taxRate` | number | ✅ | Tax rate percentage (e.g. `15`) |
| `startDate` | string (ISO 8601) | ❌ | Project start date |
| `endDate` | string (ISO 8601) | ❌ | Project end date |
| `terms` | string | ❌ | Terms and conditions text |

**Deliverables** — send as a JSON-stringified array in field `deliverables`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `serviceCatalog` | string | ✅ | Service catalog entry (value from `GET /service-catalog`) |
| `name` | string | ✅ | Deliverable name |
| `dueDate` | string (ISO 8601) | ✅ | Deliverable due date |
| `quantity` | number | ✅ | Quantity |
| `unitPrice` | number | ✅ | Unit price (SAR) |
| `salaryCosts` | number | ✅ | Salary / labour costs (SAR) |
| `toolsCosts` | number | ❌ | Tools and software costs (SAR) |
| `otherExpenses` | number | ❌ | Miscellaneous expenses (SAR) |

Example `deliverables` value:
```json
[
  {
    "serviceCatalog": "UI/UX Design",
    "name": "Dashboard Screens",
    "dueDate": "2025-03-01",
    "quantity": 1,
    "unitPrice": 15000,
    "salaryCosts": 8000,
    "toolsCosts": 500,
    "otherExpenses": 0
  }
]
```

**Payment Terms** — send as a JSON-stringified array in field `paymentTerms`

> The sum of all `percentage` values must equal `100`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | ✅ | Payment milestone description |
| `percentage` | number | ✅ | Percentage of total due at this milestone (0–100) |

Example `paymentTerms` value:
```json
[
  { "description": "Project kickoff",     "percentage": 30 },
  { "description": "Mid-project review",  "percentage": 40 },
  { "description": "Final delivery",      "percentage": 30 }
]
```

### Response `200`

```json
{
  "proposalId": "string",
  "status": "Processing",
  "message": "string"
}
```

### Error Responses

| Status | Body |
|--------|------|
| `400` | `{ "error": "string" }` |
| `401` | `{ "error": "Unauthorized" }` |

---

## 3. GET /proposals

### Query Parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `page` | number | ❌ | Page number (default: `1`) |
| `limit` | number | ❌ | Results per page (default: `20`) |
| `type` | `"Technical"` \| `"Financial"` \| `"Visualization"` | ❌ | Filter by proposal type. Omit for all. |
| `search` | string | ❌ | Free-text search on title and description |

### Response `200`

```json
{
  "proposals": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "Completed | Processing | Failed",
      "type": "Technical | Financial | Visualization",
      "progress": 0,
      "startDate": "DD/MM/YYYY",
      "endDate": "DD/MM/YYYY",
      "createdAt": "ISO 8601"
    }
  ],
  "total": 0,
  "page": 1,
  "limit": 20
}
```

---

## 4. GET /proposals/:id

### Response `200`

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "clientName": "string",
  "projectName": "string",
  "proposalLanguage": "string",
  "sectorIndustry": "string",
  "status": "Completed | Processing | Failed",
  "type": "Technical | Financial | Visualization",
  "progress": 0,
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "additionalDetails": "string",
  "generatedContent": "string",
  "sections": [],
  "documents": [],
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```

### Error Responses

| Status | Body |
|--------|------|
| `404` | `{ "error": "Proposal not found" }` |

---

## 5. DELETE /proposals/:id

### Response `200`

```json
{ "ok": true }
```

### Error Responses

| Status | Body |
|--------|------|
| `404` | `{ "error": "Proposal not found" }` |

---

## 6. GET /proposals/:id/download

Returns the proposal as a binary PDF stream.

### Query Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `format` | `"pdf"` \| `"docx"` | `"pdf"` | Output file format |

### Response `200`

Binary file stream (`Content-Type: application/pdf` or `application/vnd.openxmlformats-officedocument.wordprocessingml.document`)

### Error Responses

| Status | Body |
|--------|------|
| `404` | `{ "error": "Proposal not found" }` |

---

## 7. GET /dashboard/stats

Returns proposal counts for the current user.

### Response `200`

```json
{
  "totalProposals": 24,
  "completed": 12,
  "inProgress": 10,
  "failed": 2
}
```

---

## 8. Dropdown Options

All dropdown fields fetch their option lists from dedicated endpoints.  
**Response shape (all):** `{ "options": ["string", ...] }`

| Endpoint | Used for field |
|----------|---------------|
| `GET /proposal-language` | Proposal Language — AR and EN are shown as defaults; this endpoint provides additional languages |
| `GET /sector-industry` | Sector / Industry |
| `GET /boq-type` | BOQ Type |
| `GET /project-type` | Project Type |
| `GET /service-catalog` | Service Catalog |
| `GET /years-of-experience` | Years of Experience (team member) |
| `GET /key-skills` | Key Skills (team member) |
| `GET /admin-compliance` | Admin & Compliance section chips |
| `GET /technical-methodology` | Technical Methodology section chips |
| `GET /management-resources` | Management & Resources section chips |

### Response `200` (all endpoints)

```json
{
  "options": ["Option A", "Option B", "Option C"]
}
```
