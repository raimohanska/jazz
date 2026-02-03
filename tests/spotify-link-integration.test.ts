/**
 * Integration test for verifying a specific Spotify link works correctly
 * 
 * This test requires network access to Spotify's oEmbed API.
 * It verifies that the first link in chapter-01-ragtime.md is working.
 * 
 * To run this test:
 * 1. Ensure you have network access
 * 2. Run: npm test -- spotify-link-integration.test.ts
 */

import { verifySpotifyTrack } from '../tools/verify-spotify-links';
import { extractSpotifyLinks } from '../tools/validate-spotify-links';
import * as path from 'path';
import * as fs from 'fs';

describe('Spotify Link Integration Test', () => {
  describe('Chapter 1 - Maple Leaf Rag Link', () => {
    const chapterFile = path.join(__dirname, '..', 'chapter-01-ragtime.md');
    
    it('should have the chapter file', () => {
      expect(fs.existsSync(chapterFile)).toBe(true);
    });
    
    it('should extract Maple Leaf Rag Spotify link', () => {
      const links = extractSpotifyLinks(chapterFile);
      
      expect(links.length).toBeGreaterThan(0);
      
      // Find the Maple Leaf Rag link
      const mapleLeafLink = links.find(link => 
        link.context.includes('Maple Leaf Rag')
      );
      
      expect(mapleLeafLink).toBeDefined();
      expect(mapleLeafLink?.trackId).toBe('6yHJe5N4JVIqGcfNyJLPNn');
    });
    
    it('should verify Maple Leaf Rag track exists on Spotify', async () => {
      // This is the track ID for "Maple Leaf Rag" by Scott Joplin
      const trackId = '6yHJe5N4JVIqGcfNyJLPNn';
      
      const isValid = await verifySpotifyTrack(trackId);
      
      // If this test fails, the Spotify link is broken and needs to be updated
      // See SPOTIFY_FIX_GUIDE.md for instructions on how to fix it
      expect(isValid).toBe(true);
    }, 20000); // 20 second timeout for network request
  });
  
  describe('All Chapter 1 Links', () => {
    it('should verify all Spotify links in chapter 1 are valid', async () => {
      const chapterFile = path.join(__dirname, '..', 'chapter-01-ragtime.md');
      const links = extractSpotifyLinks(chapterFile);
      
      expect(links.length).toBe(8); // Chapter 1 should have 8 Spotify links
      
      // Verify each link
      for (const link of links) {
        const isValid = await verifySpotifyTrack(link.trackId);
        
        if (!isValid) {
          console.error(`\n❌ Broken link found:`);
          console.error(`   File: ${link.file}`);
          console.error(`   Line: ${link.line}`);
          console.error(`   Track ID: ${link.trackId}`);
          console.error(`   Context: ${link.context}\n`);
        }
        
        expect(isValid).toBe(true);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }, 60000); // 60 second timeout for verifying all links
  });
});
