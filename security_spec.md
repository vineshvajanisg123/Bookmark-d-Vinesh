# Security Specification & Adversarial Verification

This document specifies the security posture and data validation behaviors for the Bookmarkd Firestore schema.

## 1. Data Invariants

- **Ownership Integrity**: A user can only access, create, or update documents nested inside their own `/users/{userId}` parent node. Sub-collections are implicitly gated by parent ownership.
- **Strict Size/Type Limits**: String sizes cannot exceed rational boundaries (e.g., titles, chat text, or JSON fields cannot exceed 100k) to prevent Denial of Wallet memory/cost attacks.
- **Temporal Trust**: Timestamps (`createdAt`, `updatedAt`, `addedAt`, `timestamp`) must always equal the trusted server timestamp (`request.time`).
- **No Self-Privilege Escalation**: Users cannot self-upgrade roles or modify System fields.

## 2. The "Dirty Dozen" Payloads (Vulnerable Vectors blocked by Rules)

1. **Anonymous Read Attempt on User PII**: Try reading `/users/victim_123` while unauthenticated.
2. **Victim Impersonation (Write)**: Logged in as `attacker_uid`, try creating `/users/victim_123` with email `victim@gmail.com`.
3. **Ghost Field Injection (Shadow Update)**: Update `/users/attacker_uid/bookshelf/book_1` with an unapproved field `isPremiumUser: true` to bypass payment checks.
4. **Spoofed Ownership ID**: Create a bookshelves document `/users/attacker_uid/bookshelf/book_1` specifying `ownerId: "victim_123"` to make the victim pay or pollute their data.
5. **No-Verification Authentication Bypass**: Accessing with an unverified email (`email_verified == false`) where rules mandate verification.
6. **Denial of Wallet String Bomb**: Overwrite chat text field with 1MB of garbage payload characters.
7. **Temporal Fraud**: Set `createdAt` to a custom date in the past (`2010-01-01`) instead of the true server timestamp.
8. **Invalid Path Variable Poisoning**: Try writing to `/users/invalid_id_with_weird_chars_$#%$/bookshelf/book1`.
9. **Role Injection on Create**: Set custom admin claims or role attributes during registration.
10. **Terminal State Lockdown Bypass**: Overwrite a completed, archived profile, changing its target summary.
11. **Blanket Collection Scraping**: Querying the entire bookshelf collection without a secure ownership filter.
12. **Parent Orphan Write**: Writing a subcollection item where the parent user profile has not been initialized.

## 3. Adversarial Test Runner Guidelines

All rules are structured inside `/firestore.rules`.
All write operations execute helper validations (`isValidUser()`, `isValidProfile()`, etc.) verifying properties explicitly.
Any write containing a field outside of approved properties terminates with list-level verification checks or `.affectedKeys().hasOnly()` gates.
