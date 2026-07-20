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