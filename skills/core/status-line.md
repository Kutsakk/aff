# Claude Code Statusline

Custom statusline showing context usage, session info, and git information.

## What It Shows

**Line 1:** Context + Session + Model
- Context usage with "until compact" indicator
- Warning at ≤25% until compact
- Red alert at ≤10% until compact
- Time until session reset (if `ccusage` is installed)
- Claude Code model and version

**Line 2:** Directory + Git
- Current directory
- Git branch

## Installation

### Quick setup (symlink)

```bash
# Backup current statusline (if exists)
[ -f ~/.claude/statusline.sh ] && mv ~/.claude/statusline.sh ~/.claude/statusline.sh.backup

# Create symlink
ln -s /path/to/your/statusline.sh ~/.claude/statusline.sh
```

### Configure settings.json

Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }
}
```

## Updating

When you `git pull` in the source repository, the statusline updates automatically (thanks to the symlink).

## Dependencies

- `jq` — for JSON parsing (required for full functionality)
- `ccusage` — for session time display (optional)

```bash
# macOS
brew install jq

# ccusage (optional)
pip install ccusage
```

## Customization

Warning thresholds can be adjusted in the script:
- `COMPACT_THRESHOLD=95` — compaction threshold
- `until_compact -le 25` — warning threshold
- `until_compact -le 10` — red alert threshold
