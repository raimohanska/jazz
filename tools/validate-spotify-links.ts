import * as fs from 'fs';
import * as path from 'path';

export interface SpotifyLink {
  file: string;
  line: number;
  trackId: string;
  url: string;
  context: string;
}

export interface ValidationResult {
  link: SpotifyLink;
  valid: boolean;
  issues: string[];
}

/**
 * Extract Spotify track links from a markdown file
 */
export function extractSpotifyLinks(filePath: string): SpotifyLink[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const links: SpotifyLink[] = [];
  
  // Match Spotify track URLs in markdown link format: [text](https://open.spotify.com/track/TRACKID)
  const spotifyRegex = /\[([^\]]+)\]\((https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+))\)/g;
  
  lines.forEach((line, index) => {
    let match;
    // Reset regex state
    spotifyRegex.lastIndex = 0;
    while ((match = spotifyRegex.exec(line)) !== null) {
      // Get context from previous line if current line is just the link
      let context = line.trim();
      if (context === match[0] && index > 0) {
        // Include the previous line for context
        context = lines[index - 1].trim() + ' ' + context;
      }
      
      links.push({
        file: filePath,
        line: index + 1,
        trackId: match[3],
        url: match[2],
        context: context
      });
    }
  });
  
  return links;
}

/**
 * Extract all Spotify links from markdown files in a directory
 */
export function extractAllSpotifyLinks(dirPath: string): SpotifyLink[] {
  const allLinks: SpotifyLink[] = [];
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(dirPath, file);
      const links = extractSpotifyLinks(filePath);
      allLinks.push(...links);
    }
  });
  
  return allLinks;
}

/**
 * Validate Spotify track ID format
 * Spotify track IDs are 22 characters long and contain alphanumeric characters
 */
export function validateTrackIdFormat(trackId: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Check length
  if (trackId.length !== 22) {
    issues.push(`Track ID should be 22 characters, got ${trackId.length}`);
  }
  
  // Check characters (alphanumeric only)
  if (!/^[a-zA-Z0-9]+$/.test(trackId)) {
    issues.push('Track ID should only contain alphanumeric characters');
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Validate all Spotify links in terms of format
 */
export function validateSpotifyLinks(links: SpotifyLink[]): ValidationResult[] {
  return links.map(link => {
    const validation = validateTrackIdFormat(link.trackId);
    return {
      link,
      valid: validation.valid,
      issues: validation.issues
    };
  });
}

/**
 * Main function to validate all Spotify links in the repository
 */
export function main() {
  const repoRoot = path.join(__dirname, '..');
  console.log('Extracting Spotify links from markdown files...\n');
  
  const allLinks = extractAllSpotifyLinks(repoRoot);
  console.log(`Found ${allLinks.length} Spotify links\n`);
  
  console.log('Validating link formats...\n');
  const results = validateSpotifyLinks(allLinks);
  
  // Report results
  const invalidLinks = results.filter(r => !r.valid);
  const validLinks = results.filter(r => r.valid);
  
  console.log('\n' + '='.repeat(80));
  console.log('VALIDATION RESULTS');
  console.log('='.repeat(80));
  console.log(`Total links: ${results.length}`);
  console.log(`Valid format: ${validLinks.length}`);
  console.log(`Invalid format: ${invalidLinks.length}\n`);
  
  if (invalidLinks.length > 0) {
    console.log('INVALID LINK FORMATS:');
    invalidLinks.forEach(result => {
      console.log(`  ❌ ${result.link.file}:${result.link.line}`);
      console.log(`     Track ID: ${result.link.trackId}`);
      console.log(`     URL: ${result.link.url}`);
      result.issues.forEach(issue => {
        console.log(`     Issue: ${issue}`);
      });
      console.log();
    });
    
    process.exit(1);
  } else {
    console.log('✅ All Spotify link formats are valid!');
    console.log('\nNote: This only validates the format. To verify the links actually work,');
    console.log('run the verify-spotify-links.ts script with network access.');
    process.exit(0);
  }
}

// Run main if this file is executed directly
if (require.main === module) {
  main();
}
