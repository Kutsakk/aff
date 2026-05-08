---
name: summary
description: "Create session summary for handoff. Use when ending work to enable seamless continuation in a new session."
---

# Session Summary

Create a comprehensive summary of the current session for seamless handoff to a new session.

## When to Use

- Before context compaction (when you see 💬 or ⚠ warnings)
- When ending work for the day
- When switching to a different task
- When context is getting full and you need to continue in a new session

## Instructions

Create a summary document with the following structure:

### 1. Session Overview
- What was the main goal/task?
- What approach was taken?

### 2. Completed Work
- List all completed tasks with file paths
- Key changes made (brief descriptions)
- Any important decisions made and why

### 3. Current State
- What is working now?
- What was the last thing done?
- Git branch and commit status (committed/uncommitted changes)
- Any running processes or servers?

### 4. Pending Work
- What still needs to be done?
- Any blockers or issues discovered?
- Priority order for remaining tasks

### 5. Key Context
- Important file paths and their purposes
- Key patterns or conventions used
- Any gotchas or things to watch out for

### 6. How to Continue
- Exact next step to take
- Commands to run (if any)
- Files to look at first

## Output Format

Save the summary to `.claude/session-summary.md` in the project root, or output it directly if the user prefers.

Also update `.claude/projects/*/memory/MEMORY.md` with any persistent discoveries (architectural decisions, gotchas, environment quirks) that would be valuable across sessions.

## Example

```markdown
# Session Summary - 2026-02-26

## Goal
Implement user authentication with JWT tokens

## Completed
- [x] Created auth middleware (`src/middleware/auth.ts`)
- [x] Added JWT token generation (`src/utils/jwt.ts`)
- [x] Updated user routes with protected endpoints

## Current State
- Auth middleware working for /api/users routes
- Tests passing (12/12)
- Server running on port 3000

## Pending
- [ ] Add refresh token logic
- [ ] Implement logout endpoint
- [ ] Add rate limiting

## Key Files
- `src/middleware/auth.ts` - main auth logic
- `src/utils/jwt.ts` - token helpers
- `.env` - JWT_SECRET configured

## Next Step
Implement refresh token in `src/utils/jwt.ts` - add `generateRefreshToken()` and `verifyRefreshToken()` functions.
```
