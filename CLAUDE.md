# AI Assistant Instructions for Jazz Styles & Eras Book

This file provides instructions for AI assistants (Claude, GitHub Copilot, etc.) when generating or completing content for the Jazz Styles and Eras book.

## Project Structure

- **README.md** - Table of contents and navigation
- **about.md** - About This Book section
- **introduction.md** - Introduction: What Is Jazz?
- **chapter-XX-*.md** - Individual chapter files (13 chapters)
- **appendix-*.md** - Appendix files (B only - A was integrated into Chapter 4)
- **conclusion.md** - Conclusion section
- **LICENSE** - CC-BY-4.0 license
- **CLAUDE.md** - This file (AI assistant generation instructions)
- **.github/copilot-instructions.md** - Symlink to CLAUDE.md (used by GitHub Copilot)

## Quick Start for Content Generation

When asked to write a chapter or section:

1. **Read the existing chapters first** (chapter-01-ragtime.md through chapter-04-bebop.md) to understand the established style, depth, and formatting
2. **Follow the chapter structure** outlined below
3. **Link terminology** to Appendix B using `[term](appendix-b-terminology.md#term-name)` format
4. **Match the tone**: authoritative but approachable, enthusiastic, practical
5. **Use proper markdown formatting** consistent with existing chapters

---

## Book Purpose & Guidelines

### Educational Objectives

This book teaches musicians the essentials of jazz through an integrated approach combining:
- Historical context and cultural significance
- Musical analysis and theory (introduced progressively)
- Essential artists and recordings
- Practical application for players

**Primary Goal**: Enable a musician to understand, discuss, and play in various jazz styles with authentic vocabulary and comprehension.

### Required Chapter Structure

Each style chapter MUST include these sections in order:

```markdown
## [Chapter Number]. [Style Name] ([Date Range])

### Historical Context
[When/where/why it emerged - 2-4 paragraphs]

### Relationship to Earlier Styles
[What it built on, reacted against, or transformed - use bullet points organized by source style]

### Musical Characteristics
[Subheadings for: Melody, Harmony, Rhythm, Form, Instrumentation as relevant]
[Link new terms to glossary]

### Key Musicians
[Format: **Name (birth-death)** - Instrument/Role]
[2-4 sentences per musician focusing on specific contributions]

### Vocal Traditions
[If applicable to the style; note if primarily instrumental]

### Essential Recordings
[Numbered list, 6-10 recordings]
[Format: **"Title"** - Artist (Year) - One sentence explaining significance]

### Cultural Impact
[Bullet points on broader influence beyond music]
```

### Terminology Linking Strategy

- Use `[term](appendix-b-terminology.md#term-name)` format for first instance of a term in each chapter
- Ensure the term exists in Appendix B before linking
- If introducing a new term, add its definition to Appendix B (alphabetically organized)
- Common linked terms: syncopation, swing rhythm, blue notes, chromaticism, walking bass, comping, etc.

### Voice & Tone

- **Authoritative but approachable**: Expert knowledge without jargon overload
- **Enthusiastic**: Convey the excitement and beauty of the music
- **Practical**: Always connect to what a musician can do/hear/play
- **Respectful**: Honor all styles and artists
- **Clear**: Explain complex ideas simply without oversimplifying

### Formatting Conventions

- Use em-dashes (—) not hyphens for parenthetical statements
- Use proper music symbols: ♭ for flat, ♯ for sharp
- Use arrows (→) for progressions or transformations
- Instrument-specific terms should clarify which instrument (e.g., "the pianist's left hand" not just "left hand")
- Song titles in quotes with bold: **"Song Title"**
- Album titles in italics or quotes
- Artist names in bold for profiles: **Artist Name (dates)** - Role

### Content Guidelines

**For Historical Context**:
- Provide enough social/cultural background to understand why the music emerged
- Connect to broader historical events when relevant
- Mention key venues, cities, and scenes
- Note technological changes (recording, instruments) when they matter

**For Musical Analysis**:
- Use standard music theory terminology (linked to glossary)
- Provide examples from the essential recordings
- Compare/contrast with previous styles
- Highlight innovations and characteristic elements

**For Artist Profiles**:
- Brief but substantive (2-4 sentences)
- Focus on their specific contribution to the style
- Mention their instrument/role
- Include life dates for historical figures

**For Essential Recordings**:
- List 6-10 per style
- Include: Title, Artist, Year
- Brief annotation explaining significance
- Prefer historically significant original recordings

### Quality Control

- **Accuracy**: All dates, names, and historical facts must be accurate
- **Completeness**: Each chapter should give enough information to understand the style
- **Coherence**: The narrative should flow logically from one style to the next
- **Practicality**: Every concept should connect to something a musician can hear or play

---

## Chapters Requiring Completion

The following chapters contain placeholders (`[*To be written...*]`) that need to be written:

### Chapter 5: Cool Jazz & West Coast Jazz (Late 1940s-1950s)
- Cool jazz as a response to bebop's intensity
- Birth of the Cool sessions 1949
- West Coast scene in Los Angeles
- Connection to classical music and Third Stream
- Key musicians: Miles Davis, Gerry Mulligan, Chet Baker, Dave Brubeck, Paul Desmond, Lennie Tristano, Lee Konitz, Stan Getz, Modern Jazz Quartet, Shorty Rogers

### Chapter 6: Hard Bop (1950s-1960s)
- Hard bop as blues and gospel-infused bebop
- East Coast scene
- Key musicians: Art Blakey, Horace Silver, Clifford Brown, Lee Morgan, Hank Mobley
- Soul-jazz connection, organ trios

### Chapter 7: Modal Jazz (Late 1950s-1960s)
- Kind of Blue as landmark
- Miles Davis and John Coltrane
- George Russell's Lydian Chromatic Concept
- Modes instead of chord changes, static harmony

### Chapter 8: Free Jazz & Avant-Garde (1960s-1970s)
- Ornette Coleman, John Coltrane's later work, Albert Ayler, Cecil Taylor
- Breaking rules: free time, atonality, collective improvisation reimagined
- Political and social dimensions

### Chapter 9: Soul Jazz & Groove-Based Jazz (1950s-1970s)
- Organ trios (Jimmy Smith)
- Groove over complex harmony
- Key musicians: Cannonball Adderley, Lou Donaldson, Grant Green

### Chapter 10: Latin Jazz: Afro-Cuban & Brazilian (1940s-Present)
- Two traditions: Afro-Cuban (clave, montuno) vs. Brazilian (bossa nova, samba)
- Key musicians: Machito, Dizzy Gillespie, Tito Puente, João Gilberto, Stan Getz

### Chapter 11: Jazz Fusion & Jazz-Rock (Late 1960s-1980s)
- Miles Davis's Bitches Brew
- Weather Report, Mahavishnu Orchestra, Return to Forever
- Electric instruments, rock rhythms, odd meters

### Chapter 12: Post-Bop & Modern Mainstream (1960s-1990s)
- Musicians integrating all previous approaches
- Wayne Shorter, Herbie Hancock, Keith Jarrett
- ECM sound

### Chapter 13: Contemporary Jazz (1980s-Present)
- Neo-traditionalism (Wynton Marsalis)
- Smooth jazz, M-Base, hip-hop influence
- Electronic elements, genre blending

---

## Appendices Requiring Completion

### Appendix B: Complete Terminology & Concepts Reference
- Continue to expand as new terms are introduced in chapters

### Conclusion
- To be written upon completion of all chapters
- Summarize the journey through jazz
- Encourage continued exploration
- Emphasize jazz as living tradition

---

## Reference: Existing Chapter Examples

See chapter-01-ragtime.md through chapter-04-bebop.md for examples of:
- Appropriate depth and length (~800-1200 words per chapter)
- How to balance history, analysis, and practical information
- Proper formatting and linking conventions
- Essential recordings annotation style
