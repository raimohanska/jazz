#!/usr/bin/env python3
"""
Spotify Track Verifier and Finder

This script helps find and verify Spotify track URLs for jazz recordings.
It uses the Spotify Web API with credentials stored securely in environment variables.

Setup:
1. Get Spotify API credentials from https://developer.spotify.com/dashboard
2. Copy .env.example to .env and fill in your credentials
3. Install dependencies: pip install requests python-dotenv
4. Run: python3 scripts/spotify_verifier.py

Usage:
    # Search for a track
    python3 scripts/spotify_verifier.py search "Maple Leaf Rag Scott Joplin"
    
    # Verify an existing track URL
    python3 scripts/spotify_verifier.py verify https://open.spotify.com/track/6yHJe5N4JVIqGcfNyJLPNn
    
    # Verify all tracks in a markdown file
    python3 scripts/spotify_verifier.py verify-file chapter-01-ragtime.md
"""

import os
import sys
import re
import argparse
import json
from typing import Optional, List, Dict, Tuple
from urllib.parse import quote

try:
    import requests
except ImportError:
    print("Error: 'requests' module not found.")
    print("Install with: pip install requests")
    sys.exit(1)

try:
    from dotenv import load_dotenv
    DOTENV_AVAILABLE = True
except ImportError:
    DOTENV_AVAILABLE = False
    # python-dotenv is optional - can use environment variables directly


class SpotifyAPI:
    """Spotify Web API client"""
    
    def __init__(self):
        # Load environment variables from .env file if dotenv is available
        if DOTENV_AVAILABLE:
            load_dotenv()
        
        self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
        self.client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
        
        if not self.client_id or not self.client_secret:
            raise ValueError(
                "Spotify credentials not found!\n"
                "Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.\n"
                "See .env.example for instructions or SPOTIFY_SETUP.md for detailed setup guide."
            )
        
        self.access_token = None
    
    def get_access_token(self) -> str:
        """Get OAuth access token"""
        if self.access_token:
            return self.access_token
        
        auth_url = 'https://accounts.spotify.com/api/token'
        auth_response = requests.post(auth_url, {
            'grant_type': 'client_credentials',
            'client_id': self.client_id,
            'client_secret': self.client_secret,
        })
        
        if auth_response.status_code != 200:
            raise Exception(f"Authentication failed: {auth_response.text}")
        
        auth_data = auth_response.json()
        self.access_token = auth_data['access_token']
        return self.access_token
    
    def search_track(self, query: str, limit: int = 10) -> List[Dict]:
        """Search for tracks on Spotify"""
        token = self.get_access_token()
        headers = {'Authorization': f'Bearer {token}'}
        
        search_url = 'https://api.spotify.com/v1/search'
        params = {
            'q': query,
            'type': 'track',
            'limit': limit
        }
        
        response = requests.get(search_url, headers=headers, params=params)
        
        if response.status_code != 200:
            raise Exception(f"Search failed: {response.text}")
        
        data = response.json()
        return data.get('tracks', {}).get('items', [])
    
    def get_track(self, track_id: str) -> Optional[Dict]:
        """Get track details by ID"""
        token = self.get_access_token()
        headers = {'Authorization': f'Bearer {token}'}
        
        track_url = f'https://api.spotify.com/v1/tracks/{track_id}'
        response = requests.get(track_url, headers=headers)
        
        if response.status_code == 404:
            return None
        elif response.status_code != 200:
            raise Exception(f"Track lookup failed: {response.text}")
        
        return response.json()
    
    def verify_track_url(self, url: str) -> Tuple[bool, Optional[Dict]]:
        """Verify if a Spotify track URL is valid"""
        # Extract track ID from URL
        match = re.search(r'spotify\.com/track/([a-zA-Z0-9]{22})', url)
        if not match:
            return False, None
        
        track_id = match.group(1)
        track = self.get_track(track_id)
        
        if track:
            return True, track
        return False, None


def format_track_info(track: Dict) -> str:
    """Format track information for display"""
    name = track.get('name', 'Unknown')
    artists = ', '.join([artist['name'] for artist in track.get('artists', [])])
    album = track.get('album', {}).get('name', 'Unknown')
    year = track.get('album', {}).get('release_date', '')[:4]
    url = track.get('external_urls', {}).get('spotify', '')
    
    return f"""
Track: {name}
Artist(s): {artists}
Album: {album} ({year})
URL: {url}
"""


def search_command(api: SpotifyAPI, query: str):
    """Search for tracks and display results"""
    print(f"Searching for: {query}\n")
    
    try:
        tracks = api.search_track(query)
        
        if not tracks:
            print("No tracks found.")
            return
        
        print(f"Found {len(tracks)} tracks:\n")
        
        for i, track in enumerate(tracks, 1):
            print(f"--- Result {i} ---")
            print(format_track_info(track))
    
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


def verify_command(api: SpotifyAPI, url: str):
    """Verify a single Spotify URL"""
    print(f"Verifying: {url}\n")
    
    try:
        is_valid, track = api.verify_track_url(url)
        
        if is_valid:
            print("✓ VALID - Track found on Spotify")
            print(format_track_info(track))
        else:
            print("✗ INVALID - Track not found (404)")
    
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


def verify_file_command(api: SpotifyAPI, filepath: str):
    """Verify all Spotify URLs in a markdown file"""
    print(f"Verifying Spotify links in: {filepath}\n")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all Spotify track URLs
        pattern = r'https://open\.spotify\.com/track/([a-zA-Z0-9]{22})'
        matches = re.findall(pattern, content)
        
        if not matches:
            print("No Spotify track links found in file.")
            return
        
        print(f"Found {len(matches)} Spotify links\n")
        
        results = []
        for i, track_id in enumerate(matches, 1):
            url = f"https://open.spotify.com/track/{track_id}"
            print(f"[{i}/{len(matches)}] Checking: {url}")
            
            is_valid, track = api.verify_track_url(url)
            
            if is_valid:
                name = track.get('name', 'Unknown')
                artists = ', '.join([a['name'] for a in track.get('artists', [])])
                print(f"    ✓ VALID: {name} - {artists}")
                results.append(('valid', url, track))
            else:
                print(f"    ✗ INVALID: Track not found (404)")
                results.append(('invalid', url, None))
            print()
        
        # Summary
        valid_count = sum(1 for r in results if r[0] == 'valid')
        invalid_count = len(results) - valid_count
        
        print("="*60)
        print(f"SUMMARY: {valid_count} valid, {invalid_count} invalid")
        print("="*60)
        
        if invalid_count > 0:
            print("\nInvalid URLs that need replacement:")
            for status, url, _ in results:
                if status == 'invalid':
                    print(f"  ✗ {url}")
    
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description='Spotify Track Verifier and Finder',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Command to run')
    
    # Search command
    search_parser = subparsers.add_parser('search', help='Search for a track')
    search_parser.add_argument('query', help='Search query (e.g., "Maple Leaf Rag Scott Joplin")')
    
    # Verify command
    verify_parser = subparsers.add_parser('verify', help='Verify a Spotify URL')
    verify_parser.add_argument('url', help='Spotify track URL to verify')
    
    # Verify file command
    verify_file_parser = subparsers.add_parser('verify-file', help='Verify all URLs in a file')
    verify_file_parser.add_argument('filepath', help='Path to markdown file')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
    
    # Initialize Spotify API
    try:
        api = SpotifyAPI()
    except ValueError as e:
        print(f"Error: {e}")
        sys.exit(1)
    
    # Execute command
    if args.command == 'search':
        search_command(api, args.query)
    elif args.command == 'verify':
        verify_command(api, args.url)
    elif args.command == 'verify-file':
        verify_file_command(api, args.filepath)


if __name__ == '__main__':
    main()
