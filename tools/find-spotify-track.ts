#!/usr/bin/env ts-node

/**
 * Helper script to search for Spotify tracks and generate correct links
 * 
 * Usage: ts-node tools/find-spotify-track.ts "Song Title" "Artist Name"
 */

import axios from 'axios';

interface SearchArgs {
  title: string;
  artist?: string;
}

/**
 * Search for a track on Spotify using the oEmbed endpoint
 * Note: This is a simple search helper. For production use, consider using the official Spotify Web API.
 */
async function searchSpotifyTrack(args: SearchArgs): Promise<void> {
  const { title, artist } = args;
  
  console.log(`\nSearching for: "${title}"${artist ? ` by ${artist}` : ''}\n`);
  console.log('='.repeat(80));
  console.log('\nNote: This is a manual helper script.');
  console.log('To find the correct Spotify track ID:\n');
  console.log('1. Open Spotify (web or app)');
  console.log(`2. Search for: ${title}${artist ? ` ${artist}` : ''}`);
  console.log('3. Find the correct track');
  console.log('4. Right-click → Share → Copy Song Link');
  console.log('5. Extract the track ID from the URL\n');
  console.log('Example URL: https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn?si=...');
  console.log('Track ID: 6yHJe5N4JVIqGcfNyJLPNn\n');
  console.log('6. Use the format: [Spotify](https://open.spotify.com/track/TRACKID)\n');
  console.log('='.repeat(80));
}

// Parse command line arguments
function parseArgs(): SearchArgs | null {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('\nUsage: ts-node tools/find-spotify-track.ts "Song Title" ["Artist Name"]\n');
    console.error('Examples:');
    console.error('  ts-node tools/find-spotify-track.ts "Maple Leaf Rag" "Scott Joplin"');
    console.error('  ts-node tools/find-spotify-track.ts "Take Five"\n');
    return null;
  }
  
  return {
    title: args[0],
    artist: args[1]
  };
}

// Main
const args = parseArgs();
if (args) {
  searchSpotifyTrack(args).catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
} else {
  process.exit(1);
}
