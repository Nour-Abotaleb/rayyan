# Dashboard API Documentation

Base URL: `https://demo.togaar.com/api`  
All endpoints require `Authorization: Bearer <token>` unless noted.

---

## 1. Proposals

### 1.1 List Proposals
**Used by:** `ProposalsTable`  
**Hook:** `useProposals().fetchProposals()`  
**Service:** `proposalsService.getProposals()`

```
GET /proposals
```

**Query Parameters**

| Key      | Type                                        | Required | Description               |
|----------|---------------------------------------------|----------|---------------------------|
| `page`   | `number`                                    | No       | Page number (default: 1)  |
| `limit`  | `number`                                    | No       | Items per page            |
| `type`   | `"Technical" \| "Financial" \| "Visualization"` | No | Filter by proposal type   |
| `search` | `string`                                    | No       | Search by title           |

**Response `200`**
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
      "startDate": "string",
      "endDate": "string"
    }
  ],
  "total": 0,
  "page": 1,
  "limit": 10
}
```

---

### 1.2 Generate Proposal (AI — from prompt + modal)
**Flow:**
1. User types a prompt in `DashboardPage` and optionally attaches files → clicks send
2. `ProposalDetailsModal` opens — user fills in RFP, client info, company documents
3. User clicks **Done** → frontend calls `POST /proposals/generate`
4. Backend forwards all data to the AI engineer service
5. AI extracts structured data and converts it to JSON
6. AI (or backend) posts the JSON result back to the backend to finalize the proposal
7. Backend returns `proposalId` — frontend redirects to `/dashboard/proposals?generated=:id`

**Used by:** `DashboardPage` → `ProposalDetailsModal` (Done button)  
**Hook:** `useProposals().generateProposal()`  
**Service:** `proposalsService.generateProposal()`

```
POST /proposals/generate
Content-Type: multipart/form-data
```

**Request Body**

```json
{
  "prompt": "string",           // required — AI prompt typed by user
  "promptFiles": ["File"],      // optional — files attached from the prompt box (from device)
  "rfpMode": "upload | manual | none", // required — how the RFP was provided
  "rfpFiles": ["File"],         // optional — RFP files uploaded from device (rfpMode = "upload", system tab)
  "rfpDocIds": ["string"],      // optional — RFP doc IDs selected from database (rfpMode = "upload", database tab)
  "clientName": "string",       // required — client / company name
  "projectName": "string",      // required — project name
  "language": "ar | en",        // required — proposal output language
  "sector": "string",           // required — industry / sector
  "startDate": "string",        // optional — project start date
  "endDate": "string",          // optional — project end date
  "companyDocFiles": ["File"],  // optional — company documents uploaded from device
  "companyDocIds": ["string"]   // optional — company document IDs selected from database
}
```

**Response `200`**
```json
{
  "proposalId": "string",
  "status": "Processing",
  "message": "string"
}
```

> After success the frontend redirects to `/dashboard/proposals?generated={proposalId}`.

---

### 1.3 Download Proposal
**Used by:** `ProposalsTable` (download button on each card)  
**Hook:** `useProposals().downloadProposal(id)`  
**Service:** `proposalsService.downloadProposal(id)`

```
GET /proposals/:id/download
```

**Path Parameters**

| Key  | Type     | Description    |
|------|----------|----------------|
| `id` | `string` | Proposal ID    |

**Response:** Binary file (PDF). The client triggers a browser download named `proposal-{id}.pdf`.

---

## 2. Documents

### 2.1 List Documents
**Used by:** `DocumentsSection`  
**Hook:** `useDocuments().fetchDocuments()`  
**Service:** `documentsService.getDocuments()`

```
GET /documents
```

**Query Parameters**

| Key        | Type                      | Required | Description                    |
|------------|---------------------------|----------|--------------------------------|
| `category` | `"company_profile" \| "cv_resume"`   | No       | Filter by document category    |

**Response `200`**
```json
{
  "documents": [
    {
      "id": "string",
      "name": "string",
      "category": "company_profile | cv_resume",
      "url": "string",
      "createdAt": "string"
    }
  ],
  "total": 0
}
```

**Categories**

| Value       | Used by card              |
|-------------|---------------------------|
| `team`      | Team Documents card       |
| `cv_resume` | CV / Resume card          |

---

### 2.2 View Document
**Used by:** `DocumentsSection` (View button on each card)  
**Hook:** `useDocuments().viewDocument(id)`  
**Service:** `documentsService.viewDocument(id)`

```
GET /documents/:id/view
```

**Path Parameters**

| Key  | Type     | Description   |
|------|----------|---------------|
| `id` | `string` | Document ID   |

**Response:** Binary file. Opened in a new browser tab.

---

// Frontend points (Not for you)
## Integration Files

| Layer    | File                                          | Covers                        |
|----------|-----------------------------------------------|-------------------------------|
| Service  | `src/lib/api/proposals.service.ts`            | list, generate, download      |
| Service  | `src/lib/api/documents.service.ts`            | list, view                    |
| Slice    | `src/store/slices/proposalsSlice.ts`          | proposals Redux state         |
| Slice    | `src/store/slices/documentsSlice.ts`          | documents Redux state         |
| Hook     | `src/hooks/useProposals.ts`                   | all proposal actions          |
| Hook     | `src/hooks/useDocuments.ts`                   | all document actions          |
| Store    | `src/store/index.ts`                          | `proposals`, `documents` reducers registered |

---

## Wire-up Checklist (do when backend is ready)

- [x] `DashboardPage` → `ProposalDetailsModal` — prompt + files + all modal fields wired to `POST /proposals/generate` ✅
- [x] `ProposalsTable` — live data from `useProposals().fetchProposals()`; tab/search wired to `changeTab`/`changeSearch` ✅
- [x] `ProposalsTable` — download button wired to `downloadProposal(p.id)` ✅
- [x] `DocumentsSection` — `fetchTeamDocs`/`fetchCvDocs` on mount; View buttons wired to `viewDocument(doc.id)` ✅
