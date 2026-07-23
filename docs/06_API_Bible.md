# API Bible

## 1. Introduction

### Purpose

This document defines the API architecture, standards, endpoint conventions, authentication model, and communication rules used throughout the Ozu platform.

It serves as the single source of truth for backend API development.

### Scope

This document covers:

- API standards
- Authentication
- Endpoint definitions
- Request and response structures
- Error handling
- Rate limiting
- Versioning
- Future API expansion

---

## 2. API Standards

### Base URL

/api/v1

---

### Communication Format

- JSON is used for all request and response bodies.
- UTF-8 encoding is required.

---

### HTTP Methods

#### GET

Retrieve resources.

#### POST

Create new resources.

#### PATCH

Partially update existing resources.

#### DELETE

Delete resources.

---

### Resource Naming

- Use lowercase.
- Use plural resource names.
- Use kebab-case only when necessary.
- Resource names must be nouns.

Examples:

```
/users
/manga
/chapters
/comments
/favorites
```

---

### URL Structure

Resources should follow REST conventions.

Examples:

```
GET    /manga
GET    /manga/{slug}
GET    /manga/{slug}/chapters
POST   /comments
PATCH  /profiles
DELETE /favorites/{id}
```

---

### Authentication

Protected endpoints require authentication.

Public endpoints remain accessible without authentication.

---

### Response Format

Every API response follows a consistent structure.

#### Success

```json
{
  "success": true,
  "data": {}
}
```

#### Error

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

### Rules

- Every endpoint returns JSON.
- Every endpoint returns the appropriate HTTP status code.
- REST conventions are followed consistently.
- Endpoint names remain stable whenever possible.

---

## 3. Authentication

### Authentication Method

Ozu uses JWT authentication with Access Tokens and Refresh Tokens.

Access Tokens are short-lived.

Refresh Tokens are used to obtain new Access Tokens without requiring the user to sign in again.

---

### Token Storage

Authentication tokens are stored using HttpOnly Secure Cookies.

This prevents client-side JavaScript from accessing authentication tokens and provides additional protection against common web attacks.

---

### Authorization Levels

The platform supports three authorization levels.

- Guest
- User
- Administrator

Each endpoint explicitly defines its required authorization level.

---

### Protected Resources

Authentication is required for:

- Profile Management
- Favorites
- Library
- Comments
- Reports
- Settings
- Administration
```


```
## 4. Endpoints

### 4.1 Authentication

#### 4.1.1 Register

##### Endpoint

POST /auth/register

##### Description

Creates a new user account.

##### Authentication

Guest

##### Request

```json
{
  "username": "ozu",
  "email": "user@example.com",
  "password": "********"
}
```

##### Success Response

**201 Created**

```json
{
  "success": true,
  "data": {
    "message": "Account created successfully. Please verify your email."
  }
}
```

##### Error Responses

- 400 Bad Request
- 409 Conflict
- 422 Validation Error

---

#### 4.1.2 Login

##### Endpoint

POST /auth/login

##### Description

Authenticates a user and creates a new session.

##### Authentication

Guest

##### Request

```json
{
  "username": "ozu",
  "password": "********"
}
```

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "ozu",
      "display_name": "Ozu",
      "is_admin": false
    }
  }
}
```

##### Error Responses

- 400 Bad Request
- 401 Unauthorized

---

#### 4.1.3 Logout

##### Endpoint

POST /auth/logout

##### Description

Terminates the current authenticated session.

##### Authentication

User

##### Request

No request body.

##### Success Response

**204 No Content**

##### Error Responses

- 401 Unauthorized

---

#### 4.1.4 Refresh Token

##### Endpoint

POST /auth/refresh

##### Description

Issues a new Access Token using a valid Refresh Token.

##### Authentication

User

##### Request

No request body.

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "message": "Session refreshed successfully."
  }
}
```

##### Error Responses

- 401 Unauthorized

---

#### 4.1.5 Get Current User

##### Endpoint

GET /auth/me

##### Description

Returns information about the currently authenticated user.

##### Authentication

User

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "ozu",
    "display_name": "Ozu",
    "is_admin": false
  }
}
```

##### Error Responses

- 401 Unauthorized

---

#### 4.1.6 Verify Email

##### Endpoint

POST /auth/verify-email

##### Description

Verifies a user's email address.

##### Authentication

Guest

##### Request

```json
{
  "token": "verification_token"
}
```

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "message": "Email verified successfully."
  }
}
```

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 404 Not Found



### 4.2 Profiles

#### 4.2.1 Get My Profile

##### Endpoint

GET /profiles/me

##### Description

Returns the complete profile information of the authenticated user.

##### Authentication

User

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "ozu",
    "display_name": "Ozu",
    "avatar_url": "/uploads/avatars/avatar.webp",
    "profile_background_url": "/uploads/profile-backgrounds/background.webp",
    "comment_background_url": "/uploads/comment-backgrounds/comment.webp",
    "completion_badge": 27,
    "library_count": 27
  }
}
```

##### Error Responses

- 401 Unauthorized

---

#### 4.2.2 Update My Profile

##### Endpoint

PATCH /profiles/me

##### Description

Updates the authenticated user's profile customization.

##### Authentication

User

##### Request

```json
{
  "display_name": "Ozu",
  "avatar_url": "/uploads/avatars/avatar.webp",
  "profile_background_url": "/uploads/profile-backgrounds/background.webp",
  "comment_background_url": "/uploads/comment-backgrounds/comment.webp"
}
```

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "message": "Profile updated successfully."
  }
}
```

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 422 Validation Error

---

#### 4.2.3 Get Public Profile

##### Endpoint

GET /profiles/{username}

##### Description

Returns the public profile of a user.

##### Authentication

Guest

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "username": "ozu",
    "display_name": "Ozu",
    "avatar_url": "/uploads/avatars/avatar.webp",
    "completion_badge": 27,
    "library_count": 27,
    "library_sort": "ONGOING_FIRST",
    "library": [
      {
        "id": "uuid",
        "title": "One Piece",
        "cover_url": "/uploads/manga/one-piece.webp",
        "status": "ONGOING",
        "is_up_to_date": true
      },
      {
        "id": "uuid",
        "title": "Bleach",
        "cover_url": "/uploads/manga/bleach.webp",
        "status": "COMPLETED",
        "is_up_to_date": true
      }
    ]
  }
}
```

##### Error Responses

- 404 Not Found



### 4.3 Manga

#### 4.3.1 Get Home Page

##### Endpoint

GET /home

##### Description

Returns all data required to render the Home page.

##### Authentication

Guest

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "featured": [
      {
        "id": "uuid",
        "title": "One Piece",
        "slug": "one-piece",
        "cover_url": "/uploads/manga/one-piece.webp",
        "synopsis": "...",
        "status": "ONGOING"
      }
    ],
    "latest_updates": [
      {
        "id": "uuid",
        "title": "Bleach",
        "slug": "bleach",
        "cover_url": "/uploads/manga/bleach.webp",
        "latest_chapter": "Chapter 705"
      }
    ],
    "manga_of_the_day": {
      "id": "uuid",
      "title": "Vagabond",
      "slug": "vagabond",
      "cover_url": "/uploads/manga/vagabond.webp"
    },
    "announcements": [
      {
        "id": "uuid",
        "title": "Welcome to Ozu!"
      }
    ]
  }
}
```

##### Error Responses

- 404 Not Found

---

#### 4.3.2 Browse Manga

##### Endpoint

GET /manga

##### Description

Returns a paginated list of manga for the Browse page.

##### Authentication

Guest

##### Query Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| page | Integer | Page number |
| sort | String | Sorting method |
| search | String | Search keyword |
| genre | String | Genre filter |
| tag | String | Tag filter |
| status | String | Publication status |
| type | String | Manga, Manhwa, Manhua or One-shot |

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "page": 1,
    "total_pages": 120,
    "total_items": 2386,
    "items": [
      {
        "id": "uuid",
        "title": "One Piece",
        "slug": "one-piece",
        "cover_url": "/uploads/manga/one-piece.webp",
        "status": "ONGOING",
        "synopsis": "...",
        "genres": ["Action", "Adventure"]
      }
    ]
  }
}
```

##### Error Responses

- 400 Bad Request

---

#### 4.3.3 Get Manga Details

##### Endpoint

GET /manga/{slug}

##### Description

Returns all information required to render the Manga Details page.

##### Authentication

Guest

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "One Piece",
    "alternative_titles": [
      "ワンピース",
      "One Piece"
    ],
    "cover_url": "/uploads/manga/one-piece.webp",
    "synopsis": "...",
    "status": "ONGOING",
    "type": "MANGA",
    "genres": ["Action", "Adventure"],
    "tags": ["Pirates", "Shounen"],
    "is_favorite": true,
    "first_chapter": 1,
    "latest_chapter": 1155
  }
}
```

##### Error Responses

- 404 Not Found

---

#### 4.3.4 Get Chapter List

##### Endpoint

GET /manga/{slug}/chapters

##### Description

Returns all chapters of the selected manga.

##### Authentication

Guest

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "chapter_number": 1155,
      "chapter_label": "Chapter 1155",
      "published_at": "2026-07-22"
    }
  ]
}
```

##### Error Responses

- 404 Not Found

---

#### 4.3.5 Get Related Manga

##### Endpoint

GET /manga/{slug}/related

##### Description

Returns recommended manga displayed below the Manga Details page.

##### Authentication

Guest

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Bleach",
      "slug": "bleach",
      "cover_url": "/uploads/manga/bleach.webp"
    }
  ]
}
```

##### Error Responses

- 404 Not Found

---

#### 4.3.6 Get Manga of the Day

##### Endpoint

GET /manga/random

##### Description

Returns the manga selected as the Manga of the Day.

##### Authentication

Guest

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Vagabond",
    "slug": "vagabond",
    "cover_url": "/uploads/manga/vagabond.webp"
  }
}
```

##### Error Responses

- 404 Not Found



### 4.4 Chapters

#### 4.4.1 Read Chapter

##### Endpoint

GET /chapters/{id}

##### Description

Returns all data required to render the chapter reader.

##### Authentication

Guest

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "manga": {
      "title": "One Piece",
      "slug": "one-piece"
    },
    "chapter": {
      "number": 1155,
      "label": "Chapter 1155"
    },
    "pages": [
      {
        "page_number": 1,
        "image_url": "/uploads/chapters/1155/1.webp"
      },
      {
        "page_number": 2,
        "image_url": "/uploads/chapters/1155/2.webp"
      }
    ],
    "navigation": {
      "previous_chapter_id": "uuid",
      "next_chapter_id": "uuid"
    }
  }
}
```

##### Error Responses

- 404 Not Found

---

#### 4.4.2 Get Chapter Comments

##### Endpoint

GET /chapters/{id}/comments

##### Description

Returns all comments for the selected chapter.

##### Authentication

Guest

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "total_comments": 156,
    "items": []
  }
}
```

##### Error Responses

- 404 Not Found

---

#### 4.4.3 Update Reading Progress

##### Endpoint

PATCH /chapters/{id}/progress

##### Description

Updates the authenticated user's reading progress and automatically updates the Library when necessary.

##### Authentication

User

##### Request

```json
{
  "last_page": 18
}
```

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "library_updated": true,
    "is_up_to_date": true,
    "is_completed": false
  }
}
```

##### Error Responses

- 401 Unauthorized
- 404 Not Found



### 4.5 Library

#### 4.5.1 Get My Library

##### Endpoint

GET /library

##### Description

Returns the authenticated user's library.

##### Authentication

User

##### Query Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| page | Integer | Page number |
| sort | String | Sorting method |

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "page": 1,
    "total_pages": 4,
    "items": [
      {
        "id": "uuid",
        "title": "One Piece",
        "slug": "one-piece",
        "cover_url": "/uploads/manga/one-piece.webp",
        "status": "ONGOING",
        "is_up_to_date": true,
        "last_read_chapter": "Chapter 1155"
      }
    ]
  }
}
```

##### Error Responses

- 401 Unauthorized

---

#### 4.5.2 Get Library Manga

##### Endpoint

GET /library/{slug}

##### Description

Returns reading progress for a specific manga in the authenticated user's library.

##### Authentication

User

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "title": "One Piece",
    "last_read_chapter": "Chapter 1155",
    "is_up_to_date": true,
    "is_completed": false
  }
}
```

##### Error Responses

- 401 Unauthorized
- 404 Not Found



### 4.6 Favorites

#### 4.6.1 Get My Favorites

##### Endpoint

GET /favorites

##### Description

Returns the authenticated user's favorite manga.

##### Authentication

User

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Bleach",
        "slug": "bleach",
        "cover_url": "/uploads/manga/bleach.webp"
      }
    ]
  }
}
```

##### Error Responses

- 401 Unauthorized

---

#### 4.6.2 Add Favorite

##### Endpoint

POST /favorites

##### Description

Adds a manga to the authenticated user's favorites.

##### Authentication

User

##### Request

```json
{
  "manga_id": "uuid"
}
```

##### Success Response

**201 Created**

```json
{
  "success": true,
  "data": {
    "message": "Manga added to favorites."
  }
}
```

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 409 Conflict

---

#### 4.6.3 Remove Favorite

##### Endpoint

DELETE /favorites/{manga_id}

##### Description

Removes a manga from the authenticated user's favorites.

##### Authentication

User

##### Success Response

**204 No Content**

##### Error Responses

- 401 Unauthorized
- 404 Not Found



### 4.7 Comments

#### 4.7.1 Get Comments

##### Endpoint

GET /comments

##### Description

Returns comments for a manga or chapter.

##### Authentication

Guest

##### Query Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| manga_id | UUID | Optional |
| chapter_id | UUID | Optional |
| page | Integer | Page number |

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "total_comments": 254,
    "items": [
      {
        "id": "uuid",
        "user": {
          "username": "ozu",
          "display_name": "Ozu",
          "avatar_url": "/uploads/avatar.webp",
          "comment_background_url": "/uploads/comment-bg.webp",
          "completion_badge": 27
        },
        "content": "...",
        "image_url": null,
        "is_spoiler": false,
        "like_count": 126,
        "is_liked": false,
        "created_at": "...",
        "replies": []
      }
    ]
  }
}
```

##### Error Responses

- 404 Not Found

---

#### 4.7.2 Create Comment

##### Endpoint

POST /comments

##### Description

Creates a new comment or reply.

##### Authentication

User

##### Request

```json
{
  "manga_id": "uuid",
  "chapter_id": "uuid",
  "parent_comment_id": null,
  "content": "...",
  "image_url": null,
  "is_spoiler": false
}
```

##### Success Response

**201 Created**

```json
{
  "success": true,
  "data": {
    "message": "Comment created successfully."
  }
}
```

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 422 Validation Error

---

#### 4.7.3 Delete Comment

##### Endpoint

DELETE /comments/{id}

##### Description

Deletes the authenticated user's own comment.

##### Authentication

User

##### Success Response

**204 No Content**

##### Error Responses

- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

---

#### 4.7.4 Like Comment

##### Endpoint

POST /comments/{id}/like

##### Description

Likes a comment.

##### Authentication

User

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "like_count": 127,
    "is_liked": true
  }
}
```

##### Error Responses

- 401 Unauthorized
- 404 Not Found

---

#### 4.7.5 Unlike Comment

##### Endpoint

DELETE /comments/{id}/like

##### Description

Removes a like from a comment.

##### Authentication

User

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "like_count": 126,
    "is_liked": false
  }
}
```

##### Error Responses

- 401 Unauthorized
- 404 Not Found



### 4.8 Reports

#### 4.8.1 Report Comment

##### Endpoint

POST /reports

##### Description

Reports a comment for violating community rules.

##### Authentication

User

##### Request

```json
{
  "comment_id": "uuid",
  "reason": "Spoiler without tag"
}
```

##### Success Response

**201 Created**

```json
{
  "success": true,
  "data": {
    "message": "Report submitted successfully."
  }
}
```

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 409 Conflict



### 4.9 Administration

#### 4.9.1 Dashboard Overview

##### Endpoint

GET /admin/dashboard

##### Description

Returns dashboard statistics for administrators.

##### Authentication

Administrator

##### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "total_users": 12453,
    "active_users": 824,
    "total_manga": 2386,
    "total_chapters": 48291,
    "pending_reports": 14,
    "resolved_reports": 198,
    "new_users_last_7_days": 53,
    "recent_chapters": 18
  }
}
```

##### Error Responses

- 401 Unauthorized
- 403 Forbidden

---

#### 4.9.2 Manage Manga

##### Endpoint

POST /admin/manga

##### Description

Creates a new manga.

##### Authentication

Administrator

##### Request

```json
{
  "title": "One Piece",
  "slug": "one-piece"
}
```

##### Success Response

**201 Created**

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden

---

#### 4.9.3 Update Manga

##### Endpoint

PATCH /admin/manga/{id}

##### Description

Updates an existing manga.

##### Authentication

Administrator

##### Success Response

**200 OK**

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

---

#### 4.9.4 Delete Manga

##### Endpoint

DELETE /admin/manga/{id}

##### Description

Deletes a manga.

##### Authentication

Administrator

##### Success Response

**204 No Content**

##### Error Responses

- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

---

#### 4.9.5 Manage Chapters

##### Endpoint

POST /admin/chapters

##### Description

Creates or uploads a new chapter.

##### Authentication

Administrator

##### Success Response

**201 Created**

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden

---

#### 4.9.6 Manage Reports

##### Endpoint

PATCH /admin/reports/{id}

##### Description

Approves or rejects a reported comment.

##### Authentication

Administrator

##### Request

```json
{
  "status": "RESOLVED"
}
```

##### Success Response

**200 OK**

##### Error Responses

- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

---

#### 4.9.7 Delete Comment

##### Endpoint

DELETE /admin/comments/{id}

##### Description

Deletes any comment.

##### Authentication

Administrator

##### Success Response

**204 No Content**

##### Error Responses

- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

---

#### 4.9.8 Publish Announcement

##### Endpoint

POST /admin/announcements

##### Description

Creates a new announcement displayed on the Home page.

##### Authentication

Administrator

##### Request

```json
{
  "title": "Maintenance",
  "content": "The website will be unavailable for 2 hours."
}
```

##### Success Response

**201 Created**

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden

---

#### 4.9.9 Upload Images

##### Endpoint

POST /admin/uploads

##### Description

Uploads images used throughout the platform.

##### Authentication

Administrator

##### Success Response

**201 Created**

```json
{
  "success": true,
  "data": {
    "url": "/uploads/example.webp"
  }
}
```

##### Error Responses

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden



## 5. Error Handling

### Error Response Format

Every error response follows a consistent structure.

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource could not be found."
  }
}
```

---

### Standard Error Codes

| HTTP Status | Error Code |
|-------------|------------|
| 400 | BAD_REQUEST |
| 401 | UNAUTHORIZED |
| 403 | FORBIDDEN |
| 404 | RESOURCE_NOT_FOUND |
| 409 | CONFLICT |
| 422 | VALIDATION_ERROR |
| 429 | RATE_LIMIT_EXCEEDED |
| 500 | INTERNAL_SERVER_ERROR |

---

### Rules

- Every error must include an error code.
- Every error must include a human-readable message.
- Internal server details must never be exposed to clients.
- Validation errors should clearly identify invalid fields whenever possible.



## 6. Rate Limiting

### Rules

Rate limiting is applied to protect the API against abuse.

Default limits:

- Authentication endpoints: 5 requests per minute
- Public endpoints: 120 requests per minute
- Authenticated endpoints: 300 requests per minute
- Administration endpoints: 600 requests per minute

Clients exceeding the limit receive:

429 Too Many Requests



## 7. API Versioning

### Version Strategy

The API is versioned through the URL path.

Example:

/api/v1

Future breaking changes will introduce a new version.

Examples:

/api/v2
/api/v3

Older versions remain available during migration periods whenever possible.

---

### Rules

- Breaking changes require a new API version.
- Existing versions should remain stable.
- Deprecated versions should provide a migration period before removal.



## 8. Future Endpoints

The following endpoints are intentionally excluded from Version 1 and may be introduced in future releases.

- Password recovery
- Change email
- Change password
- Notification system
- User collections
- Reading history
- Reading statistics
- Recommendation engine
- Achievement system
- Public API