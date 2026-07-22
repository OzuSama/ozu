# Ozu Project Decisions

> Last Updated: 2026-07-20

This document contains all locked project decisions. Any decision marked as **Locked** cannot be changed unless a new project decision is made.

---

# DOCS-001

**Status:** 🔒 Locked

**Title:** Documentation Structure

**Decision:**

```text
docs/
├── 00_Project_Decisions.md
├── 01_Ozu_Bible.md
├── 02_PRD.md
├── 03_Roadmap.md
├── 04_Database_Bible.md
├── 05_UI_Bible.md
├── 06_API_Bible.md
├── changelog.md
└── adr/
    ├── ADR-001-Tech-Stack.md
    └── ADR-002-Database.md
```

**Reason:**

This documentation structure will be used throughout the entire project lifecycle. It will only change if a real technical requirement arises.

---

# DOCS-002

**Status:** 🔒 Locked

**Title:** Documentation Language

**Decision:**

All project documentation will be written in **English**.

**Reason:**

- Industry standard
- Consistent technical terminology
- Better GitHub presentation
- Easier future open-source transition

---

# DOCS-003

**Status:** 🔒 Locked

**Title:** Ozu Bible Structure

**Decision:**

```text
# Ozu Bible

1. Introduction
   1.1 Purpose
   1.2 Vision
   1.3 Mission

2. Core Principles

3. Product Goals

4. Target Audience

5. Project Scope

6. Out of Scope

7. Success Criteria

8. Release Strategy

9. Naming Conventions

10. References
```

**Reason:**

The Ozu Bible defines the product vision and direction only. Technical implementation belongs in dedicated technical documents.

---
---



**Status:** 🔒 Locked

**Title:** Project Decisions Document

**Decision:**

All permanent project decisions must be documented in `00_Project_Decisions.md`.

This document is the single source of truth for project-level decisions.

**Reason:**

Keeps all permanent decisions centralized and easy to reference.

---

# ARCH-001

**Status:** 🟡 Pending

**Title:** Initial Technology Stack

**Decision:**

- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma

**Reason:**

Selected as the initial technology stack.

This decision will be reviewed after the documentation phase before being marked as Locked.

---

# PM-001

**Status:** 🔒 Locked

**Title:** Milestone Strategy

**Decision:**

The project consists of five milestones.

1. Project Foundation
2. Project Design
3. MVP Development
4. Beta Release
5. Production Release

**Reason:**

Represents the complete software development lifecycle.

---

# PM-002

**Status:** 🔒 Locked

**Title:** Release Strategy

**Decision:**

Each completed milestone will be published as a GitHub Release and Git Tag.

**Version Plan:**

```text
v0.1.0 → Project Foundation

v0.2.0 → Project Design

v0.5.0 → MVP Development

v0.9.0 → Beta Release
```
---

# DOCS-005

**Status:** 🔒 Locked

**Title:** Primary Target Audience

**Decision:**

The primary target audience of Ozu is **Turkish manga readers**.

While future multilingual support may be introduced, the platform will always be designed with the Turkish manga community as its primary audience.

**Reason:**

Ozu is built to provide the best possible reading experience for Turkish manga readers, and all product decisions should prioritize their needs.

---

# DOCS-006

**Status:** 🔒 Locked

**Title:** Permanent Out of Scope Features

**Decision:**

The following features are permanently out of scope for Ozu:

- Marketplace
- NFT
- Cryptocurrency
- Blockchain integrations
- Web3-related features

**Reason:**

These features do not align with Ozu's vision, target audience, or product goals. The project will remain focused on delivering the best possible manga reading experience.

---

# PHIL-001

**Status:** 🔒 Locked

**Title:** User Experience Over Numbers

**Decision:**

Ozu measures its success by the quality of the experience it provides, not by the number of users.

Whether the platform serves one user or one thousand users, every visitor should leave with the feeling that their time on Ozu was worthwhile.

**Reason:**

The project's primary goal is to build the best possible experience for Turkish manga readers, not to maximize traffic at the expense of quality.


---

# DOCS-007

**Status:** 🔒 Locked

**Title:** Ozu Bible v1

**Decision:**

The first version of the Ozu Bible has been completed, reviewed, and approved.

The document serves as the primary reference for the project's vision, mission, principles, goals, scope, target audience, success criteria, release strategy, naming conventions, and references.

Future revisions must follow the project's documentation workflow.

**Reason:**

The Ozu Bible establishes the project's identity and provides a stable foundation for all future development.



---

# DOCS-008

**Status:** 🔒 Locked

**Title:** Platform Strategy

**Decision:**

Ozu will be developed exclusively as a web application.

Native mobile applications for Android and iOS are permanently out of scope. The platform will instead provide a responsive, mobile-first web experience.

**Reason:**

A single web platform simplifies development, maintenance, and long-term sustainability while delivering an excellent experience across desktop and mobile browsers.



---

# DESIGN-001

**Status:** 🔒 Locked

**Title:** Minimal Information Design

**Decision:**

Ozu follows a minimal information design philosophy.

Listing pages should display only the most essential information while encouraging users to explore further instead of overwhelming them with excessive details.

**Reason:**

A clean and minimal interface improves readability, creates curiosity, and provides a better overall user experience while keeping the platform simple and visually appealing.



---

# FEATURE-001

**Status:** 🔒 Locked

**Title:** Automatic Library System

**Decision:**

The user's Library is managed automatically by the platform.

A manga is added to the Library only after the user reaches the latest available chapter or completely finishes the series.

Favorites and Library serve different purposes:

- Favorites are managed manually by the user.
- Library entries are managed automatically by the system.

**Reason:**

This approach keeps the Library meaningful by representing completed or actively followed series while allowing users to manually curate their Favorites independently.



---

# PRIVACY-001

**Status:** 🔒 Locked

**Title:** Library and Favorites Visibility

**Decision:**

Users can view the contents of another user's Library but cannot view another user's Favorites.

The Library represents manga that the user has completed or caught up with, while Favorites remain private.

**Reason:**

Favorites are considered personal preferences and should remain private. The Library reflects the user's reading history and progression, making it suitable for sharing with other users while preserving personal privacy.



---

# READER-001

**Status:** 🔒 Locked

**Title:** Original Reading Format

**Decision:**

Every title must preserve its original reading format.

Manga, Manhwa, Manhua, and Webtoon content are displayed according to their native reading direction and layout.

Users cannot manually change the reading format.

**Reason:**

Preserving the original reading experience ensures consistency with the creator's intended presentation and provides a familiar experience for readers.



---

# READER-002

**Status:** 🔒 Locked

**Title:** Progressive Chapter Loading

**Decision:**

Chapter pages are loaded progressively using lazy loading instead of loading the entire chapter at once.

**Reason:**

Progressive loading improves perceived performance by allowing users to begin reading immediately while remaining pages continue loading in the background. This eliminates unnecessary waiting 



---

# UI-001

**Status:** 🔒 Locked

**Title:** Home and Browse Separation

**Decision:**

The Home page and Browse page serve different purposes.

- The Home page presents curated, fixed content selected by the platform.
- The Browse page contains the complete catalog and provides searching, filtering, sorting, and discovery features.

Users cannot customize the Home page.

**Reason:**

Separating discovery from browsing keeps the Home page clean and focused while providing a dedicated environment for exploring the complete catalog.



---

# UX-001

**Status:** 🔒 Locked

**Title:** Library Progress Visibility

**Decision:**

When a manga in the user's Library receives new chapters, its cover image is displayed in a dimmed state until the user catches up with the latest available chapter.

After the user catches up, the cover image returns to its normal appearance.

**Reason:**

This provides a subtle visual indicator of unread content without relying on intrusive notifications or badges, making it easier for users to identify series that require attention.



---

# ACHIEVEMENT-001

**Status:** 🔒 Locked

**Title:** Completion Badge System

**Decision:**

Users earn one Completion Badge point for every manga they fully complete.

The badge displays the total number of completed manga and is shown on the user's profile.

**Reason:**

The Completion Badge provides a simple representation of a user's reading achievements without introducing levels, experience points, or competitive ranking systems.



---

# PROFILE-001

**Status:** 🔒 Locked

**Title:** Profile Privacy Model

**Decision:**

User profiles are public.

When viewing another user's profile, only the user's Library is visible.

Favorites remain private and are accessible only to their owner.

**Reason:**

This approach allows users to share their reading history while keeping their personal preferences private, providing a balanced and privacy-focused profile experience.



---

# COMMENT-001

**Status:** 🔒 Locked

**Title:** Spoiler Protection Policy

**Decision:**

Users must mark comments containing spoilers with a spoiler tag.

Spoiler comments remain hidden until explicitly revealed by the reader.

Posting spoiler content without the appropriate spoiler tag may result in moderation actions, including account suspension or banning.

**Reason:**

Protecting readers from unintended spoilers is essential for maintaining a respectful and enjoyable reading experience.



---

# COMMENT-002

**Status:** 🔒 Locked

**Title:** Comment Notification Policy

**Decision:**

The platform does not send notifications for comment replies.

Users can manually revisit discussions to check for new replies.

**Reason:**

Disabling reply notifications reduces notification fatigue and keeps the platform focused on reading rather than constant social interaction.



---

# UX-002

**Status:** 🔒 Locked

**Title:** Notification-Free Experience

**Decision:**

Ozu does not implement a notification system.

The platform does not provide in-app notifications, browser notifications, chapter update notifications, announcement notifications, or reply notifications.

**Reason:**

The primary purpose of Ozu is reading manga without unnecessary distractions. Users are encouraged to explore the platform naturally instead of being driven by notifications.



---

# SETTINGS-001

**Status:** 🔒 Locked

**Title:** Minimal Settings Philosophy

**Decision:**

Ozu provides only essential user settings.

The Settings page includes appearance, account management, and reader customization while intentionally excluding unnecessary configuration options.

**Reason:**

A minimal settings page is easier to understand, reduces complexity, and aligns with Ozu's philosophy of simplicity and ease of use.



---

# ADMIN-001

**Status:** 🔒 Locked

**Title:** Draft Chapter Workflow

**Decision:**

Administrators can save chapters as drafts before publishing them.

Draft chapters remain invisible to users until they are explicitly published.

**Reason:**

Drafts allow administrators to prepare and review chapter content before making it publicly available, reducing publishing mistakes.



---

# ADMIN-002

**Status:** 🔒 Locked

**Title:** Administrative Activity Logging

**Decision:**

Every administrative action performed within the Administration panel must be recorded in an activity log.

**Reason:**

Activity logs improve accountability, simplify troubleshooting, and provide an audit trail for administrative actions.



---

# MODERATION-001

**Status:** 🔒 Locked

**Title:** Content Moderation Authority

**Decision:**

Administrators have the authority to remove comments, uploaded images, and user accounts that violate the platform's rules.

**Reason:**

This ensures the platform remains safe, respectful, and compliant with community standards.