# Spotify Link Tools

This directory contains TypeScript tools for managing and verifying Spotify track links in the Jazz Styles & Eras book.

## Overview

The jazz book contains numerous Spotify track links throughout its chapters. These tools help ensure those links are correctly formatted and working.

## Available Tools

### 1. validate-spotify-links.ts

Validates the format of Spotify track links without requiring network access.

**What it checks:**
- Link format is correct (`https://open.spotify.com/track/TRACKID`)
- Track IDs are exactly 22 characters
- Track IDs contain only alphanumeric characters

**Usage:**
```bash
npm run validate-spotify
```

**Example output:**
```
Found 38 Spotify links

================================================================================
VALIDATION RESULTS
================================================================================
Total links: 38
Valid format: 38
Invalid format: 0

✅ All Spotify link formats are valid!
```

### 2. verify-spotify-links.ts

Verifies that Spotify tracks actually exist and are accessible by checking with Spotify's oEmbed API.

**What it checks:**
- Everything from validate-spotify-links.ts
- Track actually exists on Spotify
- Track is accessible (not removed or region-locked)

**Usage:**
```bash
npm run verify-spotify
```

**Note:** This requires network access to Spotify's servers.

## Installation

If you just cloned the repository:

```bash
npm install
```

## Testing

Run the test suite:

```bash
npm test
```

Run all checks (build + tests):

```bash
npm run check
```

## How Spotify Links Work

Spotify track links in this book follow this format:

```markdown
1. **"Song Title"** - Artist Name (Year) - Description
   [Spotify](https://open.spotify.com/track/TRACKID)
```

Where:
- `TRACKID` is a 22-character alphanumeric identifier
- Example: `6yHJe5N4JVIqGcfNyJLPNn` (Maple Leaf Rag)

## Finding Spotify Track IDs

To find a track ID:

1. Open Spotify and find the track
2. Right-click the track → Share → Copy link
3. The link will look like: `https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn?si=...`
4. Extract the 22-character ID between `/track/` and `?` (or end of URL)

## Fixing Broken Links

If a link is broken:

1. Run `npm run verify-spotify` to identify broken links
2. Search Spotify for the correct recording
3. Update the track ID in the markdown file
4. Run verification again to confirm the fix

## Project Structure

```
tools/
├── validate-spotify-links.ts  # Format validation (no network needed)
├── verify-spotify-links.ts    # Full verification (requires network)
└── README.md                  # This file

tests/
└── verify-spotify-links.test.ts  # Unit tests
```

## Technical Details

### Spotify oEmbed API

The verification tool uses Spotify's public oEmbed endpoint which doesn't require authentication:

```
https://open.spotify.com/oembed?url=spotify:track:{TRACKID}
```

This returns JSON with track information if the track exists, or a 404 if it doesn't.

### Why Two Tools?

- **validate-spotify-links.ts**: Fast, works offline, catches format errors
- **verify-spotify-links.ts**: Slower, requires network, catches actual availability issues

Run validation first during development, verification before deployment.
