# Spotify API Setup Guide

This guide explains how to securely provide Spotify API credentials to verify and find working Spotify links for the jazz recordings in this repository.

## Why Spotify API Credentials Are Needed

The Spotify links in this repository currently return 404 errors because they were hallucinated IDs that don't actually exist. To find and verify working links, we need access to Spotify's Web API, which requires authentication via API credentials.

## Security Best Practices

**✓ DO:**
- Store credentials in environment variables (`.env` file)
- Keep `.env` file in `.gitignore` (already configured)
- Use read-only/search API scopes only
- Rotate credentials periodically

**✗ DON'T:**
- Commit credentials to git
- Share credentials in public channels
- Store credentials in code files
- Use personal Spotify account credentials (use API credentials instead)

---

## Step 1: Get Spotify API Credentials

### Create a Spotify Developer Account (Free)

1. Go to [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (or create one)
3. Click **"Create app"**
4. Fill in the application details:
   - **App name**: "Jazz Book Spotify Verifier" (or any name)
   - **App description**: "Script to verify and find Spotify track URLs for jazz recordings"
   - **Redirect URI**: `http://localhost` (not used, but required)
   - **APIs used**: Check "Web API"
5. Accept the Terms of Service
6. Click **"Save"**

### Get Your Credentials

1. After creating the app, you'll see your app dashboard
2. Click **"Settings"** in the top right
3. You'll see:
   - **Client ID**: A long alphanumeric string (public, but keep it secure)
   - **Client Secret**: Click "View client secret" to reveal it (**KEEP THIS SECRET!**)
4. Copy both values - you'll need them in the next step

---

## Step 2: Configure Credentials Locally

### Using Environment Variables (Recommended)

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your credentials:**
   ```bash
   SPOTIFY_CLIENT_ID=your_actual_client_id_here
   SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
   ```

3. **Verify `.env` is in `.gitignore`:**
   ```bash
   cat .gitignore | grep .env
   ```
   You should see `.env` listed (already configured).

### Alternative: Export Environment Variables (Temporary)

For a single session, you can export the variables directly:

```bash
export SPOTIFY_CLIENT_ID="your_actual_client_id_here"
export SPOTIFY_CLIENT_SECRET="your_actual_client_secret_here"
```

**Note:** These will only persist for the current terminal session.

---

## Step 3: Install Dependencies

The verification script requires Python 3.7+ and two packages:

```bash
pip install requests python-dotenv
```

Or if you prefer using a virtual environment (recommended):

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate  # On Windows

# Install dependencies
pip install requests python-dotenv
```

---

## Step 4: Use the Spotify Verifier Script

The `scripts/spotify_verifier.py` script provides three main functions:

### Search for a Track

Find Spotify URLs for a specific recording:

```bash
python3 scripts/spotify_verifier.py search "Maple Leaf Rag Scott Joplin"
```

**Output:**
```
Searching for: Maple Leaf Rag Scott Joplin

Found 10 tracks:

--- Result 1 ---
Track: Maple Leaf Rag
Artist(s): Scott Joplin
Album: The Essential Scott Joplin (2023)
URL: https://open.spotify.com/track/XXXXXXXXXXXXXXXXXXXX

--- Result 2 ---
...
```

### Verify a Single URL

Check if a Spotify URL is valid:

```bash
python3 scripts/spotify_verifier.py verify "https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn"
```

**Output:**
```
Verifying: https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn

✗ INVALID - Track not found (404)
```

### Verify All URLs in a File

Check all Spotify links in a markdown chapter:

```bash
python3 scripts/spotify_verifier.py verify-file chapter-01-ragtime.md
```

**Output:**
```
Verifying Spotify links in: chapter-01-ragtime.md

Found 8 Spotify links

[1/8] Checking: https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn
    ✗ INVALID: Track not found (404)

[2/8] Checking: https://open.spotify.com/track/47qGa2NezwKTQ99LmVPNHu
    ✗ INVALID: Track not found (404)

...

============================================================
SUMMARY: 0 valid, 8 invalid
============================================================

Invalid URLs that need replacement:
  ✗ https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn
  ✗ https://open.spotify.com/track/47qGa2NezwKTQ99LmVPNHu
  ...
```

---

## Step 5: Update Links in Markdown Files

Once you've found valid Spotify URLs using the search command:

1. **Search for the track:**
   ```bash
   python3 scripts/spotify_verifier.py search "Maple Leaf Rag Scott Joplin"
   ```

2. **Copy the correct URL** from the search results

3. **Update the markdown file** (e.g., `chapter-01-ragtime.md`):
   ```markdown
   1. **"Maple Leaf Rag"** - Scott Joplin (1899) - The piece that defined ragtime
      [Spotify](https://open.spotify.com/track/XXXXXXXXXXXXXXXXXXXX)
   ```

4. **Verify the fix:**
   ```bash
   python3 scripts/spotify_verifier.py verify-file chapter-01-ragtime.md
   ```

---

## Workflow for Fixing All Broken Links

1. **Find all files with Spotify links:**
   ```bash
   grep -l "spotify.com/track" *.md
   ```

2. **For each chapter file:**
   ```bash
   # Check which links are broken
   python3 scripts/spotify_verifier.py verify-file chapter-01-ragtime.md
   
   # Search for correct links
   python3 scripts/spotify_verifier.py search "Maple Leaf Rag Scott Joplin"
   
   # Update the markdown file with correct URL
   # (manually edit the file)
   
   # Verify the fix
   python3 scripts/spotify_verifier.py verify-file chapter-01-ragtime.md
   ```

3. **Repeat for each broken link**

---

## Security Checklist

Before committing your changes:

- [ ] `.env` file is in `.gitignore`
- [ ] No credentials are hardcoded in any files
- [ ] `.env` file is **NOT** committed to git
- [ ] Only `.env.example` (template) is committed

**Verify with:**
```bash
# Check what will be committed
git status

# Ensure .env is not listed
# If it is listed, run: git reset HEAD .env
```

---

## Troubleshooting

### "Spotify credentials not found!"

**Solution:** Make sure you've created a `.env` file with your credentials:
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### "Authentication failed"

**Solution:** 
- Double-check your Client ID and Client Secret
- Make sure there are no extra spaces or quotes in `.env`
- Verify credentials in Spotify Dashboard: https://developer.spotify.com/dashboard

### "Module not found: requests / dotenv"

**Solution:** Install the required packages:
```bash
pip install requests python-dotenv
```

### "No tracks found"

**Solution:**
- Try a different search query
- Try just the artist name: `"Scott Joplin"`
- Try just the track name: `"Maple Leaf Rag"`
- Some historical recordings may not be on Spotify

---

## For GitHub Copilot / LLM Agents

If you're an AI assistant helping to fix Spotify links:

1. **Request credentials from the user:**
   ```
   "To search for Spotify links, I need Spotify API credentials. 
   Please follow SPOTIFY_SETUP.md to create a .env file with your credentials."
   ```

2. **Once credentials are available**, use the verification script:
   ```bash
   python3 scripts/spotify_verifier.py search "Track Name Artist Name"
   ```

3. **Extract the first/best result** and update the markdown file

4. **Verify after updating:**
   ```bash
   python3 scripts/spotify_verifier.py verify-file chapter-XX-name.md
   ```

### Example Usage in Code:

```python
import subprocess
import json

# Search for a track
result = subprocess.run(
    ['python3', 'scripts/spotify_verifier.py', 'search', 'Maple Leaf Rag Scott Joplin'],
    capture_output=True,
    text=True
)

# Parse output and extract URL
# (Output is human-readable, not JSON - parse accordingly)
```

---

## Additional Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Spotify API Authentication Guide](https://developer.spotify.com/documentation/web-api/concepts/authorization)
- [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

---

## Questions?

If you encounter issues or have questions about the setup, please open an issue in the repository.
