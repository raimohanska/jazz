import * as fs from 'fs';
import * as path from 'path';
import { extractSpotifyLinks, SpotifyLink } from './validate-spotify-links';

/**
 * Convert a plain Spotify link to an embedded iframe
 */
export function convertToEmbed(link: SpotifyLink, height: number = 80): string {
  // Extract the context line to preserve the song title and description
  const embedUrl = `https://open.spotify.com/embed/track/${link.trackId}`;
  
  return `<iframe style="border-radius:12px" src="${embedUrl}" width="100%" height="${height}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
}

/**
 * Convert a plain Spotify link to an embedded iframe with compact size
 */
export function convertToCompactEmbed(link: SpotifyLink): string {
  return convertToEmbed(link, 152);
}

/**
 * Update a markdown file to use Spotify embeds instead of plain links
 */
export function updateMarkdownWithEmbeds(filePath: string, dryRun: boolean = true): void {
  const content = fs.readFileSync(filePath, 'utf-8');
  const links = extractSpotifyLinks(filePath);
  
  if (links.length === 0) {
    console.log(`No Spotify links found in ${filePath}`);
    return;
  }
  
  let updatedContent = content;
  
  // Replace each link with an embed (in reverse order to preserve positions)
  links.reverse().forEach(link => {
    const originalPattern = `[Spotify](${link.url})`;
    const embed = convertToEmbed(link);
    updatedContent = updatedContent.replace(originalPattern, embed);
  });
  
  if (dryRun) {
    console.log(`\nDry run for ${filePath}:`);
    console.log(`Would replace ${links.length} links with embeds`);
    console.log('\nExample replacement:');
    console.log('Before:', `[Spotify](${links[0].url})`);
    console.log('After:', convertToEmbed(links[0]));
  } else {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${filePath} with ${links.length} embedded players`);
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  
  if (dryRun) {
    console.log('DRY RUN MODE - No files will be modified');
    console.log('Add --apply flag to actually update files\n');
  }
  
  const repoRoot = path.join(__dirname, '..');
  const files = fs.readdirSync(repoRoot);
  
  const markdownFiles = files.filter(f => f.endsWith('.md') && f.startsWith('chapter-'));
  
  console.log(`Found ${markdownFiles.length} chapter files\n`);
  
  markdownFiles.forEach(file => {
    const filePath = path.join(repoRoot, file);
    updateMarkdownWithEmbeds(filePath, dryRun);
  });
  
  console.log('\n' + '='.repeat(80));
  if (dryRun) {
    console.log('\nDry run complete. Review the changes above.');
    console.log('To apply these changes, run: npm run embed-spotify -- --apply\n');
  } else {
    console.log('\nAll files updated successfully!');
  }
}

if (require.main === module) {
  main();
}
