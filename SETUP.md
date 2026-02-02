# GitHub Pages Setup Instructions

This repository is configured to deploy to GitHub Pages using Jekyll with the Just the Docs theme. The site features:
- **Left sidebar navigation** on desktop
- **Mobile-friendly hamburger menu** on mobile devices
- **Search functionality**
- **Automatic deployment** via GitHub Actions

## Enabling GitHub Pages

To enable GitHub Pages for this repository:

1. Go to the repository **Settings** on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Save the settings

The site will automatically build and deploy when you push to the `main` branch.

## Accessing the Site

Once deployed, the site will be available at:
- **https://raimohanska.github.io/jazz/**

The first deployment may take a few minutes. You can monitor the deployment progress in the **Actions** tab.

## Local Development

To run the site locally for testing:

### Prerequisites
- Ruby 3.1 or higher
- Bundler (`gem install bundler`)

### Setup
```bash
# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve

# Open in browser
# Site will be available at http://localhost:4000/jazz/
```

### Making Changes
1. Edit markdown files
2. Jekyll will automatically rebuild (if using `serve` with live reload)
3. Refresh browser to see changes

## Configuration

The site configuration is in `_config.yml`:
- **Theme**: Just the Docs
- **Search**: Enabled
- **Navigation**: Hierarchical (parent/child pages)
- **Base URL**: `/jazz` (for GitHub Pages)

## Navigation Structure

The navigation is organized using Jekyll front matter:
- `nav_order`: Controls the order in navigation
- `parent`: Creates hierarchical structure
- `has_children`: Indicates a parent page

Example:
```yaml
---
layout: default
title: "Chapter Title"
nav_order: 1
parent: Chapters
---
```

## Troubleshooting

### Build Fails
- Check the **Actions** tab for error details
- Ensure all markdown files have valid front matter
- Verify Gemfile dependencies are correct

### Links Not Working
- Internal links should use `.html` extension (Jekyll converts `.md` to `.html`)
- Cross-references should use relative paths

### Navigation Not Showing
- Ensure front matter includes `nav_order`
- Parent pages need `has_children: true`
- Child pages need `parent: ParentTitle`

## Theme Documentation

For more customization options, see the [Just the Docs theme documentation](https://just-the-docs.com/).
