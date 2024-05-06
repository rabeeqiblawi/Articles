const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read the existing articles.meta.json file
const articlesMeta = JSON.parse(fs.readFileSync('articles.meta.json', 'utf-8'));

// Get a list of all directories in the root directory
const directories = fs.readdirSync('.', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// For each directory...
directories.forEach(directory => {
  // If this directory is not already in articles.meta.json...
  if (!articlesMeta.some(article => article.articleGitHubUrl === directory)) {
    // Generate a new ID
    const id = crypto.randomBytes(16).toString('hex');

    // Find the .md file
    const mdFile = fs.readdirSync(directory).find(file => path.extname(file) === '.md');

    // Extract the necessary metadata from the .md file
    // This will depend on the format of your .md files
    const metadata = extractMetadataFromMdFile(path.join(directory, mdFile));

    // Find the thumbnail image
    const thumbnailImageUrl = path.join(directory, 'thumbnail.jpg');

    // Add a new entry to articles.meta.json
    articlesMeta.push({
      id,
      title: metadata.title,
      subtitle: metadata.subtitle,
      intro: metadata.intro,
      articleGitHubUrl: directory,
      thumbnailImageUrl,
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
      tags: metadata.tags,
      keywords: metadata.keywords,
      relatedArticleIDs: metadata.relatedArticleIDs,
    });
  }
});

// Write the updated articles.meta.json back to disk
fs.writeFileSync('articles.meta.json', JSON.stringify(articlesMeta, null, 2));

// A placeholder function for extracting metadata from a .md file
// You'll need to replace this with your own function
function extractMetadataFromMdFile(mdFilePath) {
  // ...
}