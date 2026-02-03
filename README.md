# JAZZ STYLES AND ERAS: A MUSICIAN'S GUIDE

---

## Table of Contents

### Front Matter
- [About This Book](about)
- [Introduction: What Is Jazz?](introduction)

### Part I: Building Blocks (Theory Integrated with History)
1. [Pre-Jazz & Ragtime (1890s-1910s)](chapter-01-ragtime)
2. [New Orleans Jazz & Dixieland (1910s-1930s)](chapter-02-new-orleans)
3. [Swing & the Big Band Era (1930s-1940s)](chapter-03-swing)

### Part II: The Bebop Revolution & Its Descendants
4. [Bebop (1940s-1950s)](chapter-04-bebop)
5. [Cool Jazz & West Coast Jazz (Late 1940s-1950s)](chapter-05-cool-jazz)
6. [Hard Bop (1950s-1960s)](chapter-06-hard-bop)

### Part III: Breaking the Rules
7. [Modal Jazz (Late 1950s-1960s)](chapter-07-modal-jazz)
8. [Free Jazz & Avant-Garde (1960s-1970s)](chapter-08-free-jazz)

### Part IV: Groove, Fusion & Global Influences
9. [Soul Jazz & Groove-Based Jazz (1950s-1970s)](chapter-09-soul-jazz)
10. [Latin Jazz: Afro-Cuban & Brazilian (1940s-Present)](chapter-10-latin-jazz)
11. [Jazz Fusion & Jazz-Rock (Late 1960s-1980s)](chapter-11-fusion)

### Part V: Modern Era & Current Directions
12. [Post-Bop & Modern Mainstream (1960s-1990s)](chapter-12-post-bop)
13. [Contemporary Jazz (1980s-Present)](chapter-13-contemporary)

### Appendices
- [Appendix B: Complete Terminology & Concepts Reference](appendix-b-terminology)

### Back Matter
- [Conclusion](conclusion)

---

## View Online

**📖 [Read the book online with interactive navigation](https://raimohanska.github.io/jazz/)**

This repository is configured to automatically deploy to GitHub Pages with a mobile-friendly navigation system.

---

## For Contributors

### Fixing Broken Spotify Links

The Spotify links in the book chapters currently return 404 errors. To find and verify working links:

1. **See [SPOTIFY_SETUP.md](SPOTIFY_SETUP.md)** for detailed instructions on:
   - Getting free Spotify API credentials
   - Securely storing credentials using environment variables
   - Using the verification script to find correct links

2. **Quick overview:**
   ```bash
   # Set up credentials (one time)
   cp .env.example .env
   # Edit .env with your Spotify API credentials
   
   # Search for correct links
   python3 scripts/spotify_verifier.py search "Maple Leaf Rag Scott Joplin"
   
   # Verify links in a file
   python3 scripts/spotify_verifier.py verify-file chapter-01-ragtime.md
   ```

3. **Security:** Credentials are stored in `.env` which is gitignored. Never commit credentials to the repository.

---

## License

This work is licensed under a Creative Commons Attribution 4.0 International License (CC-BY-4.0).

## About This Project

This is a comprehensive guide to jazz styles and eras, written for musicians who want to understand the evolution of jazz from its roots to the present day. Each chapter focuses on a specific style or era, providing historical context, musical analysis, key artists, and essential recordings.

The book is designed to be read sequentially or used as a reference, with cross-references between chapters and appendices.
