# Scripts Directory

This directory contains utility scripts for maintaining the Jazz repository.

## Available Scripts

### `spotify_verifier.py`

A Python script for finding and verifying Spotify track URLs.

**Purpose:** The Spotify links in the book chapters were originally hallucinated and return 404 errors. This script helps find correct links using the Spotify Web API.

**Setup:** See [SPOTIFY_SETUP.md](../SPOTIFY_SETUP.md) for detailed instructions.

**Quick Start:**
```bash
# 1. Get Spotify API credentials (free developer account)
# 2. Create .env file with credentials
cp ../.env.example ../.env
# Edit .env with your credentials

# 3. Install dependencies
pip install requests python-dotenv

# 4. Use the script
python3 spotify_verifier.py search "Maple Leaf Rag Scott Joplin"
python3 spotify_verifier.py verify "https://open.spotify.com/track/..."
python3 spotify_verifier.py verify-file ../chapter-01-ragtime.md
```

**Features:**
- Search Spotify for tracks by name and artist
- Verify if a Spotify URL is valid (200 vs 404)
- Check all Spotify links in a markdown file
- Secure credential handling via environment variables

---

## Adding New Scripts

When adding scripts to this directory:
1. Make them executable: `chmod +x script_name.sh`
2. Add usage documentation (in comments or separate README)
3. Use environment variables for sensitive data
4. Update this README with the new script information
