---
name: continue
description: "Continue session from previous summary. Use at the start of a new session to restore context and continue work."
---

# Continue Session

Restore context from a previous session and continue work seamlessly.

## When to Use

- At the start of a new Claude Code session
- After context compaction
- When picking up work from a colleague
- When resuming after a break

## Instructions

### Step 1: Find the Summary

Look for session summary in these locations (in order):
1. `.claude/session-summary.md` (project root)
2. `SESSION-SUMMARY.md` (project root)
3. `.claude/projects/*/memory/MEMORY.md` (auto-memory from previous sessions)
4. Ask user if they have a summary to share

**Fallback:** If no summary file exists, run `git log --oneline -10` to get recent context from commit history.

### Step 2: Read and Understand

Read the summary file and extract:
- What was the goal?
- What was completed?
- What is the current state?
- What needs to be done next?

### Step 3: Verify Current State

Before continuing, verify the state described in summary:
- Check if mentioned files exist
- Run tests if mentioned
- Check git status for any uncommitted changes

### Step 4: Report Ready State

Tell the user:
1. What you understood from the summary
2. Current state verification results
3. Proposed next step
4. Ask for confirmation before proceeding

## Example Workflow

```text
User: /continue

Claude: I found a session summary from 2026-02-26.

**Previous Goal:** Implement user authentication with JWT tokens

**Completed:**
- Auth middleware (src/middleware/auth.ts)
- JWT token generation (src/utils/jwt.ts)
- Protected user routes

**Current State Verification:**
- ✅ All mentioned files exist
- ✅ Tests pass (12/12)
- ✅ No uncommitted changes

**Next Step:** Implement refresh token logic in src/utils/jwt.ts

Ready to continue. Should I proceed with the refresh token implementation?
```

## Output

After reading the summary and verifying state:
1. Provide a brief recap of the previous session
2. Confirm what's working
3. State the exact next action
4. Wait for user confirmation before making changes
