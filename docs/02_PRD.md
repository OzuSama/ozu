# Product Requirements Document (PRD)

## 1. Introduction

### 1.1 Purpose

This document defines the functional and non-functional requirements of Ozu. It serves as the primary reference for understanding what the platform should do, how each feature should behave, and what is required before implementation begins.

### 1.2 Scope

This document covers all planned features, user roles, user interactions, system behaviors, and acceptance criteria for Ozu. It does not describe technical implementation details, database design, or API specifications, as those are documented separately.

### 1.3 Intended Audience

This document is intended for everyone involved in the project, including developers, designers, contributors, and future maintainers. It provides a shared understanding of the product requirements before development.



## 2. Product Overview

### 2.1 Product Summary

Ozu is a modern web-based manga reading platform designed primarily for Turkish manga readers. The platform focuses on delivering a clean, fast, and intuitive reading experience while allowing users to build and manage their personal manga library.

### 2.2 Objectives

The primary objectives of Ozu are:

- Provide a modern and enjoyable manga reading experience.
- Help users organize and track their reading progress.
- Build a healthy and sustainable ecosystem for Turkish manga readers.
- Deliver a responsive and high-performance platform.
- Continuously improve the platform through user feedback and iterative development.

### 2.3 Product Type

Ozu is a web-based manga reading platform focused on manga discovery, reading, and personal library management. The project is designed exclusively as a web application and is not planned to have native mobile applications.



## 3. User Roles

### 3.1 Guest

A Guest can browse the platform without creating an account.

Permissions:

- Browse manga.
- Read manga chapters.
- Search for manga.
- View manga information.
- View comments and ratings.

Restrictions:

- Cannot comment.
- Cannot rate manga.
- Cannot create a personal library.
- Cannot track reading progress.
- Cannot personalize the platform.

---

### 3.2 User

A User is a registered member of the platform with access to personalized features.

Permissions:

- All Guest permissions.
- Create and manage a personal library.
- Track reading progress.
- Mark manga as favorites.
- Write comments.
- Rate manga.
- Edit profile information.
- Customize personal settings.

---

### 3.3 Administrator

Administrators are responsible for managing and maintaining the platform.

Permissions:

- Manage manga.
- Manage chapters.
- Manage users.
- Moderate comments.
- Manage categories and tags.
- Configure platform settings.
- Access administrative tools and statistics.



## 4. Functional Requirements

### 4.1 Authentication

#### 4.1.1 Registration

Users must be able to create an account using:

- Username
- Email address
- Password

**Requirements:**

- Username must be unique.
- Email address must be unique.
- Password must contain at least 8 characters.
- The user must accept the Terms of Service and Privacy Policy before creating an account.

**Rules:**

- The account username is permanent and cannot be changed after registration.
- The email address is permanent and cannot be changed after registration.
- Users may change their public display name from their profile settings without affecting their account username.

---

#### 4.1.2 Login

Users must be be able to sign in using:

- Username
- Password

**Requirements:**

- Only username and password authentication is supported.
- Third-party authentication providers (Google, Discord, GitHub, etc.) are not supported.
- Successful authentication creates a secure user session.

---

#### 4.1.3 Logout

Users must be able to securely log out of their account at any time.

**Requirements:**

- The current session must be terminated immediately.
- Protected pages must no longer be accessible after logout.

---

#### 4.1.4 Password Recovery

Users must be able to reset their password through their registered email address.

**Requirements:**

- Password reset links must be time-limited.
- Password reset tokens must be single-use.
- A new password must meet the minimum password requirements.

---

#### 4.1.5 Email Verification

Every newly created account must verify its email address before gaining full access to the platform.

**Requirements:**

- A verification email must be sent after registration.
- Verification links must expire after a defined period.
- Unverified accounts may have restricted functionality.

---

#### 4.1.6 Session Management

The platform must securely manage user sessions.

**Requirements:**

- Sessions must remain active until the user logs out or the session expires.
- Invalid or expired sessions must require the user to log in again.
- Protected resources must only be accessible to authenticated users.



### 4.2 Home

#### Description

The Home page is the main entry point of Ozu. It provides users with quick access to newly updated manga, featured titles, and manga discovery while maintaining a clean and organized layout.



#### Requirements

- Display a featured manga slider at the top of the page.
- The featured slider must contain approximately 5–6 popular manga with their cover images and short descriptions.
- Display the latest manga updates below the featured slider.
- The latest updated manga must always be sorted from newest to oldest.
- Display a "Manga of the Day" section at the bottom of the page with a randomly selected manga.
- Provide quick access to the search function.
- The Home page must be fully responsive across desktop and mobile devices.
- Manga lists must use pagination instead of infinite scrolling.
- Provide a dedicated **Browse** page where users can search, filter, and explore all available titles.

#### Rules

- Guests and authenticated users see the same Home page.
- The Home page layout cannot be customized by users.
- Navigation and content discovery should remain simple and intuitive.
- Search and filtering are not available on the Home page.
- The Home page content is fixed and cannot be customized by users.



### 4.3 Manga Library

#### Description

The Manga Library allows users to browse and discover all available titles on the platform through a clean, simple, and organized interface.

#### Requirements

- Display manga using a card-based layout.
- Each manga card must display:
  - Cover image
  - Title
  - Publication status
  - Short synopsis
- Information should remain minimal to avoid overwhelming users while encouraging exploration.
- Users must be able to filter manga by genre.
- Users must be able to sort manga by:
  - Most Popular
  - Recently Updated
  - Highest Rated
  - Ascending Order
  - Descending Order
  - Alphabetical Order
- The library must display 20 manga per page.
- Pagination must be used instead of infinite scrolling.
- The search system must support all registered titles and alternative names of a manga.
- Manga, Manhwa, Manhua, and One-shot titles are displayed together in a single library.

#### Rules

- Only a card layout is supported.
- List view is not supported.
- Search matches only manga titles and their registered alternative names.
- Genre is the only filtering option in the initial release.
- Users cannot separate Manga, Manhwa, Manhua, or One-shot titles by content type in the initial release.



### 4.4 Manga Details

#### Description

The Manga Details page provides users with essential information about a manga while offering quick access to reading, library features, and community interaction.

#### Requirements

- Display the manga cover.
- Display the manga title.
- Display the publication status.
- Display a short synopsis.
- Display platform statistics above the cover image.
- Provide a **Favorite** button.
- Provide a **Read First Chapter** button.
- Provide a **Read Latest Chapter** button.
- Display the complete chapter list.
- The newest chapter must always appear first.
- Users must be able to reverse the chapter order.
- Display comments at the bottom of the page.
- Display the same comment section at the bottom of every chapter page.

#### Rules

- Alternative titles are used only for search purposes and are not displayed on the Manga Details page.
- Users manually manage their Favorites.
- Users cannot manually manage their Library.
- A manga is automatically added to the user's Library only after the user reaches the latest available chapter or completely finishes the series.
- Similar or recommended manga are not displayed.
- Only the manga cover is displayed; banner images are not supported.
- Statistics are displayed above the cover image and nowhere else on the page.



### 4.5 Reading System

#### Description

The Reading System provides a smooth, responsive, and distraction-free reading experience while preserving each title's original reading format.

#### Requirements

- Display each title using its original reading format.
- Support:
  - Right-to-left reading (Manga)
  - Left-to-right reading (where applicable)
  - Vertical scrolling (Webtoon/Manhwa)
- Support navigation using:
  - Mouse clicks
  - Mouse scroll
  - Keyboard arrow keys
  - Touch gestures on mobile devices
- Allow users to change the reader background color.
- Automatically save the last read chapter.
- Display navigation controls at the end of every chapter:
  - Previous Chapter
  - Manga Details
  - Next Chapter
- Display the comment section at the bottom of every chapter.
- Allow authenticated users to create replies and comments.
- Allow guests to read comments only.
- Load chapter pages progressively using lazy loading.

#### Rules

- The original reading format of each title cannot be changed by the user.
- Responsive behavior is handled automatically by the platform.
- Individual page progress is not saved.
- Only the last read chapter is stored.
- Reader background color is the only configurable reading preference in the initial release.
- The platform never displays advertisements inside the reader.
- Chapter pages must be loaded progressively to improve perceived performance and reduce unnecessary waiting time.



### 4.7 User Library

#### Description

The User Library automatically tracks manga that the user has completed or caught up with, providing a clean overview of their reading history.

#### Requirements

- Display library entries using the same card layout as the Browse page.
- Users can reorder the displayed titles according to their preferred sorting option.
- Library entries cannot be manually added or removed.
- When a followed manga receives a new chapter, its cover image must appear dimmed until the user catches up again.
- Once the user reaches the latest available chapter, the cover image returns to its normal appearance.
- Completed series must display a **Completed** badge on the cover.
- Users can sort library entries by:
  - Ongoing first
  - Completed first
- The same sorting options are available when viewing another user's Library.

#### Rules

- The Library is managed automatically by the platform.
- Users cannot manually edit, add, or remove Library entries.
- The Library uses the same visual card design as the Browse page.
- Library search is not supported in the initial release.
- Filtering is not supported; only sorting options are available.



### 4.8 User Profile

#### Description

The User Profile represents a user's identity, reading achievements, and personal customization while maintaining a clean and privacy-focused experience.

#### Requirements

- Display the user's:
  - Profile picture
  - Username
  - Completion Badge
- The Completion Badge displays the total number of fully completed manga.
- The Completion Badge automatically increases by one for every completed manga.
- Allow users to customize:
  - Profile picture
  - Display name
  - Profile background
  - Comment background
- Profile picture and display name are visible to everyone.
- The profile background is visible only to the profile owner.
- The comment background is displayed behind the user's comments across the platform.
- When viewing another user's profile, only the user's Library is visible.
- When viewing their own profile, users can switch between:
  - Favorites
  - Library

#### Rules

- Completion Badge progress is managed automatically by the platform.
- Only manga marked as completed contribute to the Completion Badge.
- Users cannot manually edit their Completion Badge.
- Favorites are private and visible only to their owner.
- Library is public and visible to all users.
- User comments remain only on their respective manga or chapter pages and are not displayed on profile pages.
- All user profiles are public.



### 4.9 Comments

#### Description

The Comment System allows users to discuss manga and chapters through a simple, community-driven interface while protecting readers from spoilers.

#### Requirements

- Only authenticated users can create comments and replies.
- Guests can read comments but cannot interact with them.
- Support unlimited nested replies displayed in a flat conversation under the parent comment.
- Replies must mention the username of the user being replied to.
- Support:
  - Text
  - Emojis
  - Images
- Support comment likes.
- Comments are sorted by the number of likes in descending order.
- Administrators can pin comments to the top of the comment section.
- Users can mark comments as containing spoilers.
- Spoiler comments remain hidden until the reader chooses to reveal them.
- Users can delete their own comments.
- Users can report comments.
- Display comments at the bottom of both manga detail pages and chapter pages.

#### Rules

- Comments cannot be edited after publication.
- Reply notifications are not sent.
- Only administrators can pin comments.
- Images are allowed in comments.
- Spoiler tags are mandatory for spoiler content.
- Posting untagged spoilers may result in moderation actions, including account suspension or banning.



### 4.10 Notifications

#### Description

Ozu does not include a traditional notification system. The platform is designed to minimize distractions and keep the user focused on reading.

#### Requirements

- No in-app notification center.
- No reply notifications.
- No new chapter notifications.
- No announcement notifications.
- No browser notifications.
- No notification settings.

#### Rules

- Users are expected to discover new content through the platform rather than through notifications.
- The absence of notifications is an intentional design decision focused on simplicity and an uninterrupted reading experience.



### 4.11 Settings

#### Description

The Settings page allows users to manage their account and personalize their experience through a minimal set of essential options.

#### Requirements

- Allow users to switch between:
  - Light Theme
  - Dark Theme
- Allow users to change:
  - Password
  - Display Name
  - Profile Picture
  - Profile Background
  - Comment Background
- Allow users to change the reader background color.
- Allow users to permanently delete their account.

#### Rules

- Turkish is the only supported language in the initial release.
- Username cannot be changed.
- Email address cannot be changed.
- Privacy settings are not supported.
- Data export is not supported.
- Account deletion is permanent and cannot be undone.



### 4.12 Administration

#### Description

The Administration panel provides administrators with the tools required to manage the platform, moderate content, and maintain a safe and organized environment.

#### Requirements

##### Manga Management

Administrators can:

- Create manga
- Edit manga
- Delete manga
- Update cover images
- Manage alternative titles
- Manage genres
- Update publication status

##### Chapter Management

Administrators can:

- Create chapters
- Save chapters as drafts
- Publish chapters
- Edit chapters
- Delete chapters

##### User Management

Administrators can:

- Search users
- Suspend users
- Remove suspensions
- Delete user accounts
- Delete comments
- Delete uploaded images from comments

##### Report Management

Administrators can:

- Review reported comments
- View pending reports
- View resolved reports
- Take moderation actions

##### Announcements

Administrators can:

- Publish announcements displayed on the Home page
- Edit announcements
- Remove announcements

##### Dashboard

The dashboard displays:

- Total users
- Active users
- Total manga
- Total chapters
- Pending reports
- Resolved reports
- Chapters published during the last 7 days
- Users registered during the last 7 days

##### Activity Log

The system records administrative actions, including:

- Manga creation
- Manga updates
- Manga deletion
- Chapter management
- User moderation
- Report moderation

#### Rules

- Only administrators can access the Administration panel.
- Draft chapters are invisible to users until published.
- Every administrative action must be recorded in the activity log.
- Deleted inappropriate images are permanently removed from the platform.