import * as fs from 'fs';
import * as path from 'path';
import {
  extractSpotifyLinks,
  validateTrackIdFormat,
  validateSpotifyLinks,
  SpotifyLink
} from '../tools/validate-spotify-links';

describe('Spotify Link Validation', () => {
  const testFile = path.join(__dirname, 'test-sample.md');
  
  beforeAll(() => {
    // Create a test markdown file with Spotify links
    const testContent = `# Test Chapter

## Essential Recordings

1. **"Maple Leaf Rag"** - Scott Joplin (1899)  
   [Spotify](https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn)
2. **"The Entertainer"** - Scott Joplin (1902)  
   [Spotify](https://open.spotify.com/track/47qGa2NezwKTQ99LmVPNHu)
3. **"Invalid Link"** - Test (2000)  
   [Spotify](https://open.spotify.com/track/INVALID)
`;
    fs.writeFileSync(testFile, testContent);
  });
  
  afterAll(() => {
    // Clean up test file
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });
  
  describe('extractSpotifyLinks', () => {
    it('should extract Spotify links from markdown file', () => {
      const links = extractSpotifyLinks(testFile);
      
      expect(links).toHaveLength(3);
      expect(links[0].trackId).toBe('6yHJe5N4JVIqGcfNyJLPNn');
      expect(links[0].url).toBe('https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn');
      expect(links[1].trackId).toBe('47qGa2NezwKTQ99LmVPNHu');
      expect(links[2].trackId).toBe('INVALID');
    });
    
    it('should include file path and line number', () => {
      const links = extractSpotifyLinks(testFile);
      
      expect(links[0].file).toBe(testFile);
      expect(links[0].line).toBeGreaterThan(0);
    });
  });
  
  describe('validateTrackIdFormat', () => {
    it('should validate a correct track ID format', () => {
      const result = validateTrackIdFormat('6yHJe5N4JVIqGcfNyJLPNn');
      
      expect(result.valid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });
    
    it('should detect track ID with wrong length', () => {
      const result = validateTrackIdFormat('INVALID');
      
      expect(result.valid).toBe(false);
      expect(result.issues).toContain('Track ID should be 22 characters, got 7');
    });
    
    it('should detect track ID with invalid characters', () => {
      const result = validateTrackIdFormat('6yHJe5N4JVIqGcfNyJLPNn!');
      
      expect(result.valid).toBe(false);
      expect(result.issues.some(issue => issue.includes('alphanumeric'))).toBe(true);
    });
  });
  
  describe('validateSpotifyLinks', () => {
    it('should validate links and return results', () => {
      const links = extractSpotifyLinks(testFile);
      const results = validateSpotifyLinks(links);
      
      expect(results).toHaveLength(3);
      expect(results[0].valid).toBe(true);
      expect(results[1].valid).toBe(true);
      expect(results[2].valid).toBe(false);
      expect(results[2].issues.length).toBeGreaterThan(0);
    });
  });
});
