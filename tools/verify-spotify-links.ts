import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

export interface SpotifyLink {
  file: string;
  line: number;
  trackId: string;
  url: string;
  context: string;
}

export interface VerificationResult {
  link: SpotifyLink;
  valid: boolean;
  error?: string;
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
    while ((match = spotifyRegex.exec(line)) !== null) {
      links.push({
        file: filePath,
        line: index + 1,
        trackId: match[3],
        url: match[2],
        context: line.trim()
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
 * Verify if a Spotify track exists by checking the oembed endpoint
 * This is a public API that doesn't require authentication
 */
export async function verifySpotifyTrack(trackId: string): Promise<boolean> {
  try {
    const oembedUrl = `https://open.spotify.com/oembed?url=spotify:track:${trackId}`;
    const response = await axios.get(oembedUrl, {
      timeout: 10000,
      validateStatus: (status) => status < 500 // Accept 4xx as valid response (will check data)
    });
    
    // If we get a successful response with track data, the track exists
    if (response.status === 200 && response.data && response.data.title) {
      return true;
    }
    
    return false;
  } catch (error: any) {
    // 404 means track doesn't exist
    if (error.response && error.response.status === 404) {
      return false;
    }
    // Network errors or other issues - we'll consider it as potentially invalid
    console.error(`Error verifying track ${trackId}:`, error.message);
    return false;
  }
}

/**
 * Verify a list of Spotify links
 */
export async function verifySpotifyLinks(links: SpotifyLink[]): Promise<VerificationResult[]> {
  const results: VerificationResult[] = [];
  
  for (const link of links) {
    console.log(`Verifying ${link.trackId} from ${link.file}:${link.line}...`);
    const valid = await verifySpotifyTrack(link.trackId);
    results.push({
      link,
      valid,
      error: valid ? undefined : 'Track not found or inaccessible'
    });
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}

/**
 * Main function to verify all Spotify links in the repository
 */
export async function main() {
  const repoRoot = path.join(__dirname, '..');
  console.log('Extracting Spotify links from markdown files...\n');
  
  const allLinks = extractAllSpotifyLinks(repoRoot);
  console.log(`Found ${allLinks.length} Spotify links\n`);
  
  console.log('Verifying links...\n');
  const results = await verifySpotifyLinks(allLinks);
  
  // Report results
  const invalidLinks = results.filter(r => !r.valid);
  const validLinks = results.filter(r => r.valid);
  
  console.log('\n' + '='.repeat(80));
  console.log('VERIFICATION RESULTS');
  console.log('='.repeat(80));
  console.log(`Total links: ${results.length}`);
  console.log(`Valid links: ${validLinks.length}`);
  console.log(`Invalid links: ${invalidLinks.length}\n`);
  
  if (invalidLinks.length > 0) {
    console.log('INVALID LINKS:');
    invalidLinks.forEach(result => {
      console.log(`  ❌ ${result.link.file}:${result.link.line}`);
      console.log(`     Track ID: ${result.link.trackId}`);
      console.log(`     URL: ${result.link.url}`);
      console.log(`     Error: ${result.error}\n`);
    });
    
    process.exit(1);
  } else {
    console.log('✅ All Spotify links are valid!');
    process.exit(0);
  }
}

// Run main if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error running verification:', error);
    process.exit(1);
  });
}
