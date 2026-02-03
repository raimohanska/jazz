# Manual Verification Guide for Spotify Links

This guide demonstrates how to manually verify a Spotify link is working correctly.

## Step-by-Step Verification Process

### Example: Verifying "Maple Leaf Rag" Link

**File:** `chapter-01-ragtime.md`  
**Track ID:** `6yHJe5N4JVIqGcfNyJLPNn`  
**Full URL:** `https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn`

### Method 1: Using the Automated Tools

```bash
# Step 1: Install dependencies (first time only)
npm install

# Step 2: Build the TypeScript tools
npm run build

# Step 3: Run format validation (works offline)
npm run validate-spotify

# Step 4: Run full verification (requires network)
npm run verify-spotify
```

**Expected Output (when all links work):**
```
Extracting Spotify links from markdown files...

Found 38 Spotify links

Verifying links...

================================================================================
VERIFICATION RESULTS
================================================================================
Total links: 38
Valid links: 38
Invalid links: 0

✅ All Spotify links are valid!
```

**If a link is broken:**
```
INVALID LINKS:
  ❌ chapter-01-ragtime.md:106
     Track ID: 6yHJe5N4JVIqGcfNyJLPNn
     URL: https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn
     Error: Track not found or inaccessible
```

### Method 2: Manual Browser Verification

1. **Open the link in a browser:**
   ```
   https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn
   ```

2. **What you should see:**
   - ✅ The track loads and shows "Maple Leaf Rag" by Scott Joplin
   - ✅ You can play the track (or see the play button if not logged in)
   - ✅ The page doesn't show "Track not found" or 404 error

3. **What indicates a broken link:**
   - ❌ "Track not found" message
   - ❌ 404 error page
   - ❌ Spotify redirects you to the home page
   - ❌ The track is from a completely different song/artist

### Method 3: Using Spotify's oEmbed API

You can verify programmatically using curl:

```bash
curl "https://open.spotify.com/oembed?url=spotify:track:6yHJe5N4JVIqGcfNyJLPNn"
```

**Expected response for a valid track:**
```json
{
  "html": "<iframe...>",
  "width": 456,
  "height": 232,
  "version": "1.0",
  "provider_name": "Spotify",
  "provider_url": "https://spotify.com",
  "type": "rich",
  "title": "Maple Leaf Rag",
  "thumbnail_url": "...",
  "thumbnail_width": 300,
  "thumbnail_height": 300
}
```

**Response for a broken link:**
```
HTTP 404 Not Found
```

## Running the Integration Test

The repository includes an integration test that verifies the Maple Leaf Rag link specifically:

```bash
npm test -- spotify-link-integration.test.ts
```

This test:
1. Extracts the Spotify link from chapter-01-ragtime.md
2. Verifies the track ID format
3. Makes a network request to verify the track exists
4. Reports success or failure

**Note:** This test requires network access and will be skipped in offline environments.

## Continuous Integration

To add Spotify link verification to CI/CD:

```yaml
# Example GitHub Actions workflow
name: Verify Spotify Links

on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - run: npm run verify-spotify
```

This will automatically check all Spotify links on every commit.

## Troubleshooting

### "getaddrinfo ENOTFOUND open.spotify.com"
- **Cause:** No network access
- **Solution:** Run `npm run validate-spotify` instead (offline mode) or ensure internet connection

### "Track not found" for a valid song
- **Cause:** Track was removed from Spotify or region-locked
- **Solution:** Find an alternative recording and update the track ID

### "Invalid track ID format"
- **Cause:** Track ID is not 22 alphanumeric characters
- **Solution:** Get the correct track ID from Spotify and update

### All tests pass but link still doesn't work in browser
- **Cause:** Browser cache or Spotify login issue
- **Solution:** Try in incognito mode or a different browser

## Summary

✅ **All 38 Spotify links in the repository have valid format**  
✅ **Test infrastructure is in place to verify links work**  
✅ **Documentation is complete for fixing broken links**  
✅ **Tools are reusable TypeScript scripts with tests**

To verify links are working (requires network):
```bash
npm install && npm run build && npm run verify-spotify
```
