# Database Bible

## 1. Introduction

### Purpose

This document defines the database architecture, naming conventions, relationships, and standards used throughout the Ozu platform.

It serves as the single source of truth for database design and must be followed by all future development.

### Scope

This document covers:

- Database naming conventions
- Database standards
- Table structures
- Relationships
- Indexing strategy
- Future database expansion



## 2. Naming Convention

### Table Names

- Use lowercase names.
- Use snake_case.
- Use plural names whenever applicable.
- Words that are naturally uncountable remain unchanged.

Examples:

users
profiles
chapters
comments
favorites
library
manga

---

### Column Names

- Use lowercase.
- Use snake_case.
- Avoid abbreviations unless universally understood.

Examples:

user_id
chapter_id
display_name
created_at

---

### Primary Keys

Every table uses a single primary key named:

id

---

### Foreign Keys

Foreign keys always follow:

<referenced_table>_id

Examples:

user_id
manga_id
chapter_id
comment_id

---

### Timestamp Columns

Standard timestamp columns:

created_at
updated_at

Soft delete is added only when required:

deleted_at

---

### Boolean Columns

Boolean fields always begin with:

is_

Examples:

is_admin
is_verified
is_spoiler
is_published

---

### Enum Values

Enums use uppercase values.

Example:

ONGOING
COMPLETED
HIATUS
CANCELLED

---

### IDs

All primary keys use UUID.

Reasons:

- Better security
- Prevents predictable IDs
- Easier horizontal scaling



## 3. Database Standards

### 3.1 General Principles

#### Rules

- Every table must have a primary key.
- Every table should contain `created_at` and `updated_at` columns unless there is a valid reason not to.
- Duplicate data should be avoided whenever possible.
- Relationships should be normalized unless denormalization provides a measurable performance benefit.
- Database integrity must always be enforced through constraints.

---

### 3.2 Constraints

#### Rules

- Primary keys must be unique.
- Foreign keys must enforce referential integrity.
- Required fields must use `NOT NULL`.
- Unique values must use `UNIQUE`.
- Enum fields must use database enums whenever appropriate.

---

### 3.3 Cascading Rules

#### Rules

- Cascading deletes should be used only when data should always disappear together.
- Critical user-generated content should never be deleted accidentally through cascading operations.
- Soft deletion should be preferred for important entities when recovery may be required.

---

### 3.4 Transactions

#### Rules

- Multi-step operations must be executed inside database transactions.
- Database transactions must either complete successfully or roll back entirely.
- Partial writes must never occur.

---

### 3.5 Indexing

#### Rules

- Primary keys are indexed automatically.
- Frequently searched columns should be indexed.
- Foreign keys should be indexed.
- Composite indexes should be created only when justified by query patterns.
- Unused indexes should be avoided.

---

### 3.6 Data Integrity

#### Rules

- Orphaned records must not exist.
- Invalid references must be prevented.
- Business rules should be enforced at both the application and database levels when appropriate.

---

### 3.7 Auditability

#### Rules

- Important administrative actions must be traceable.
- Activity logs should preserve historical information whenever possible.
- Critical records should not lose their creation history.



## 4. Entity Relationship Overview

The following diagram represents the high-level relationships between the core entities of the Ozu platform.

```text
Users
│
├── Profiles
├── Favorites
├── Library
├── Comments
├── Comment Likes
└── Reports

Manga
│
├── Chapters
├── Genres
├── Tags
├── Favorites
├── Library
└── Comments

Comments
│
├── Comment Likes
└── Reports

Administration
│
├── Announcements
└── Activity Logs
```

### Core Relationships

| Entity | Relationship |
|---------|--------------|
| User → Profile | One-to-One |
| User → Favorites | One-to-Many |
| User → Library | One-to-Many |
| User → Comments | One-to-Many |
| User → Comment Likes | One-to-Many |
| User → Reports | One-to-Many |
| Manga → Chapters | One-to-Many |
| Manga → Genres | Many-to-Many |
| Manga → Tags | Many-to-Many |
| Manga → Favorites | One-to-Many |
| Manga → Library | One-to-Many |
| Manga → Comments | One-to-Many |
| Comment → Replies | One-to-Many (Self Reference) |
| Comment → Comment Likes | One-to-Many |
| Comment → Reports | One-to-Many |
| Administrator → Announcements | One-to-Many |
| Administrator → Activity Logs | One-to-Many |



## 5. Tables

### 5.1 users

#### Description

Stores authentication and account information for every registered user.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique user identifier |
| username | VARCHAR | UNIQUE, NOT NULL | Login username |
| email | VARCHAR | UNIQUE, NOT NULL | User email address |
| password_hash | TEXT | NOT NULL | Hashed user password |
| is_admin | BOOLEAN | NOT NULL, DEFAULT FALSE | Administrator permission |
| is_verified | BOOLEAN | NOT NULL, DEFAULT FALSE | Email verification status |
| created_at | TIMESTAMP | NOT NULL | Account creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One User has one Profile.
- One User can have many Favorites.
- One User can have many Library entries.
- One User can have many Comments.
- One User can have many Comment Likes.
- One User can have many Reports.
- One User can have many Activity Logs (if administrator).



### 5.2 profiles

#### Description

Stores public profile information and personalization settings for each user.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique profile identifier |
| user_id | UUID | FK, UNIQUE, NOT NULL | References users.id |
| display_name | VARCHAR | NOT NULL | Public display name |
| avatar_url | TEXT | NULL | Profile picture |
| profile_background_url | TEXT | NULL | Private profile background |
| completed_manga_count | INTEGER | NOT NULL, DEFAULT 0 | Number of completed manga |
| created_at | TIMESTAMP | NOT NULL | Profile creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Profile belongs to one User.



### 5.3 manga

#### Description

Stores all information related to manga series available on the platform.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique manga identifier |
| title | VARCHAR | NOT NULL | Primary manga title |
| slug | VARCHAR | UNIQUE, NOT NULL | SEO-friendly URL slug |
| cover_url | TEXT | NOT NULL | Manga cover image |
| synopsis | TEXT | NOT NULL | Short manga description |
| status | ENUM | NOT NULL | Publication status |
| type | ENUM | NOT NULL | Manga, Manhwa, Manhua or One-shot |
| view_count | INTEGER | NOT NULL, DEFAULT 0 | Total page views |
| created_at | TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Manga has many Chapters.
- One Manga has many Favorites.
- One Manga has many Library entries.
- One Manga has many Comments.
- One Manga belongs to many Genres.
- One Manga belongs to many Tags.



### 5.4 manga_titles

#### Description

Stores all titles associated with a manga, including the primary title and alternative titles used for searching and identification.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique title identifier |
| manga_id | UUID | FK, NOT NULL | References manga.id |
| title | VARCHAR | NOT NULL | Manga title |
| language | VARCHAR | NOT NULL | Title language |
| is_primary | BOOLEAN | NOT NULL, DEFAULT FALSE | Indicates the primary display title |
| created_at | TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Title belongs to one Manga.
- One Manga can have many Titles.




### 5.5 chapters

#### Description

Stores every chapter published for a manga.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique chapter identifier |
| manga_id | UUID | FK, NOT NULL | References manga.id |
| chapter_number | DECIMAL | NULL | Numeric value used for sorting chapters |
| chapter_label | VARCHAR | NOT NULL | Display title (e.g. Chapter 10, Chapter 10.5, Special, Extra, One Shot) |
| is_published | BOOLEAN | NOT NULL, DEFAULT FALSE | Publication status |
| published_at | TIMESTAMP | NULL | Publication date |
| created_at | TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Chapter belongs to one Manga.
- One Chapter has many Pages.



### 5.6 chapter_pages

#### Description

Stores every page belonging to a chapter in the correct reading order.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique page identifier |
| chapter_id | UUID | FK, NOT NULL | References chapters.id |
| page_number | INTEGER | NOT NULL | Reading order of the page |
| image_url | TEXT | NOT NULL | URL of the page image |
| created_at | TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Page belongs to one Chapter.
- One Chapter can have many Pages.



### 5.7 genres

#### Description

Stores all available manga genres.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique genre identifier |
| name | VARCHAR | UNIQUE, NOT NULL | Genre name |
| slug | VARCHAR | UNIQUE, NOT NULL | SEO-friendly genre slug |
| created_at | TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Genre belongs to many Manga.

---

### 5.8 manga_genres

#### Description

Junction table that connects manga and genres.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique relationship identifier |
| manga_id | UUID | FK, NOT NULL | References manga.id |
| genre_id | UUID | FK, NOT NULL | References genres.id |
| created_at | TIMESTAMP | NOT NULL | Creation date |

#### Relationships

- One record belongs to one Manga.
- One record belongs to one Genre.

---

### 5.9 tags

#### Description

Stores searchable tags associated with manga.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique tag identifier |
| name | VARCHAR | UNIQUE, NOT NULL | Tag name |
| slug | VARCHAR | UNIQUE, NOT NULL | SEO-friendly tag slug |
| created_at | TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Tag belongs to many Manga.

---

### 5.10 manga_tags

#### Description

Junction table that connects manga and tags.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique relationship identifier |
| manga_id | UUID | FK, NOT NULL | References manga.id |
| tag_id | UUID | FK, NOT NULL | References tags.id |
| created_at | TIMESTAMP | NOT NULL | Creation date |

#### Relationships

- One record belongs to one Manga.
- One record belongs to one Tag.



### 5.11 favorites

#### Description

Stores manga that users have manually added to their Favorites.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique favorite identifier |
| user_id | UUID | FK, NOT NULL | References users.id |
| manga_id | UUID | FK, NOT NULL | References manga.id |
| created_at | TIMESTAMP | NOT NULL | Date added to Favorites |

#### Relationships

- One Favorite belongs to one User.
- One Favorite belongs to one Manga.

---

### 5.12 library

#### Description

Stores manga that users have automatically completed or caught up with.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique library identifier |
| user_id | UUID | FK, NOT NULL | References users.id |
| manga_id | UUID | FK, NOT NULL | References manga.id |
| last_read_chapter_id | UUID | FK, NULL | References chapters.id |
| is_completed | BOOLEAN | NOT NULL, DEFAULT FALSE | Indicates whether the manga is fully completed |
| is_up_to_date | BOOLEAN | NOT NULL, DEFAULT FALSE | Indicates whether the user is currently caught up |
| created_at | TIMESTAMP | NOT NULL | Date added to Library |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Library entry belongs to one User.
- One Library entry belongs to one Manga.
- One Library entry references one Chapter as the last read chapter.



### 5.13 comments

#### Description

Stores all comments and replies created by users.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique comment identifier |
| user_id | UUID | FK, NOT NULL | References users.id |
| manga_id | UUID | FK, NOT NULL | References manga.id |
| chapter_id | UUID | FK, NULL | References chapters.id |
| parent_comment_id | UUID | FK, NULL | Self reference for replies |
| content | TEXT | NOT NULL | Comment content |
| image_url | TEXT | NULL | Optional attached image |
| is_spoiler | BOOLEAN | NOT NULL, DEFAULT FALSE | Indicates spoiler content |
| like_count | INTEGER | NOT NULL, DEFAULT 0 | Cached number of likes |
| created_at | TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Comment belongs to one User.
- One Comment belongs to one Manga.
- One Comment may belong to one Chapter.
- One Comment may reply to another Comment.
- One Comment can have many replies.
- One Comment can have many Likes.
- One Comment can have many Reports.

---

### 5.14 comment_likes

#### Description

Stores likes given to comments by users.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique like identifier |
| user_id | UUID | FK, NOT NULL | References users.id |
| comment_id | UUID | FK, NOT NULL | References comments.id |
| created_at | TIMESTAMP | NOT NULL | Creation date |

#### Relationships

- One Like belongs to one User.
- One Like belongs to one Comment.

---

### 5.15 reports

#### Description

Stores reports submitted by users for inappropriate comments.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique report identifier |
| user_id | UUID | FK, NOT NULL | References users.id |
| comment_id | UUID | FK, NOT NULL | References comments.id |
| reason | TEXT | NOT NULL | Report reason |
| status | ENUM | NOT NULL | Report status |
| reviewed_by | UUID | FK, NULL | References users.id (Administrator) |
| reviewed_at | TIMESTAMP | NULL | Review date |
| created_at | TIMESTAMP | NOT NULL | Report creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Report belongs to one User.
- One Report belongs to one Comment.
- One Report may be reviewed by one Administrator.



### 5.16 announcements

#### Description

Stores announcements displayed on the Home page.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique announcement identifier |
| title | VARCHAR | NOT NULL | Announcement title |
| content | TEXT | NOT NULL | Announcement content |
| is_published | BOOLEAN | NOT NULL, DEFAULT FALSE | Publication status |
| published_at | TIMESTAMP | NULL | Publication date |
| created_by | UUID | FK, NOT NULL | References users.id (Administrator) |
| created_at | TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | NOT NULL | Last update date |

#### Relationships

- One Announcement is created by one Administrator.

---

### 5.17 activity_logs

#### Description

Stores administrative actions performed within the platform for auditing purposes.

#### Columns

| Column | Type | Constraints | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Unique log identifier |
| user_id | UUID | FK, NOT NULL | References users.id (Administrator) |
| action | VARCHAR | NOT NULL | Action performed |
| entity_type | VARCHAR | NOT NULL | Type of affected entity |
| entity_id | UUID | NOT NULL | Identifier of the affected entity |
| details | JSONB | NULL | Additional action details |
| created_at | TIMESTAMP | NOT NULL | Action timestamp |

#### Relationships

- One Activity Log belongs to one Administrator.



## 6. Relationships

### One-to-One

| Parent | Child |
|---------|-------|
| users | profiles |

---

### One-to-Many

| Parent | Child |
|---------|-------|
| users | favorites |
| users | library |
| users | comments |
| users | comment_likes |
| users | reports |
| users | activity_logs |
| manga | manga_titles |
| manga | chapters |
| manga | favorites |
| manga | library |
| manga | comments |
| chapters | chapter_pages |
| comments | comment_likes |
| comments | reports |

---

### Many-to-Many

| Entity A | Junction Table | Entity B |
|-----------|----------------|----------|
| manga | manga_genres | genres |
| manga | manga_tags | tags |

---

### Self Reference

| Table | Description |
|-------|-------------|
| comments | Replies are linked using `parent_comment_id`. |



## 7. Indexing Strategy

### Primary Keys

- Every primary key is indexed automatically.

---

### Foreign Keys

The following foreign keys must be indexed:

- user_id
- manga_id
- chapter_id
- comment_id
- parent_comment_id

---

### Search Indexes

Indexes should be created for:

- username
- email
- slug
- title

---

### Composite Indexes

Composite indexes should be added only after measuring real query performance.

---

### Rules

- Avoid unnecessary indexes.
- Every index must have a measurable performance benefit.



## 8. Future Database Changes

The following database changes are intentionally excluded from the initial version and may be introduced in future releases.

- Authors
- Artists
- Publishers
- Reading statistics
- Achievements
- User collections
- Reading lists
- Recommendation data
- Notification system
- Multi-language metadata