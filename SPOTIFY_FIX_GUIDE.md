# How to Verify and Fix a Broken Spotify Link

This document demonstrates the process of verifying and fixing a Spotify link in the Jazz book.

## Example: "Maple Leaf Rag" by Scott Joplin

### Current Link Information

**File:** `chapter-01-ragtime.md`  
**Line:** 106  
**Current Track ID:** `6yHJe5N4JVIqGcfNyJLPNn`  
**Current URL:** `https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn`  
**Song:** "Maple Leaf Rag" - Scott Joplin (1899)

### Steps to Verify

1. **Check the Link Format**
   ```bash
   npm run validate-spotify
   ```
   This confirms the track ID format is correct (22 alphanumeric characters).

2. **Check if Track Exists** (requires network access)
   ```bash
   npm run verify-spotify
   ```
   Or manually visit: https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn

3. **Manual Verification**
   - Open Spotify (web or app)
   - Try to access the link directly
   - If it shows "Track not found" or similar error, it's broken

### How to Find the Correct Link

If a link is broken:

1. **Search Spotify**
   - Open Spotify
   - Search for: "Maple Leaf Rag Scott Joplin"
   - Look for a recording from the right era/style

2. **Get the Track ID**
   - Right-click the correct track
   - Select "Share" → "Copy Song Link"
   - You'll get a URL like: `https://open.spotify.com/track/NEW_TRACK_ID?si=...`
   - Extract just the 22-character track ID

3. **Update the Markdown**
   ```markdown
   [Spotify](https://open.spotify.com/track/NEW_TRACK_ID)
   ```

4. **Verify the Fix**
   ```bash
   npm run validate-spotify  # Check format
   npm run verify-spotify    # Check if it works (requires network)
   ```

### Example Fix

**Before:**
```markdown
1. **"Maple Leaf Rag"** - Scott Joplin (1899)  
   [Spotify](https://open.spotify.com/track/BROKEN_TRACK_ID)
```

**After:**
```markdown
1. **"Maple Leaf Rag"** - Scott Joplin (1899)  
   [Spotify](https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn)
```

## Test Case

The test suite includes a test for the "Maple Leaf Rag" link:

```typescript
describe('verifySpotifyTrack', () => {
  it('should verify a valid Spotify track ID', async () => {
    const trackId = '6yHJe5N4JVIqGcfNyJLPNn'; // Maple Leaf Rag
    const isValid = await verifySpotifyTrack(trackId);
    expect(isValid).toBe(true);
  }, 15000);
});
```

This test requires network access to run. When you have network access:

```bash
npm test
```

The test will verify that the Spotify API confirms the track exists.

## Common Issues

### Track Removed from Spotify
- The recording might have been removed due to licensing
- Find an alternative recording of the same piece
- Update the track ID

### Region-Locked Content
- Some tracks are not available in all regions
- The oEmbed API will still return 200 if the track exists globally
- This is generally not a problem for the link validity

### Invalid Track ID Format
- Must be exactly 22 characters
- Only alphanumeric characters (no special characters)
- The validation tool catches these automatically

## Automation

To check all links at once (requires network access):

```bash
# Check format only (works offline)
npm run validate-spotify

# Check if tracks exist (requires internet)
npm run verify-spotify
```

The script will report all broken links with file names and line numbers.
