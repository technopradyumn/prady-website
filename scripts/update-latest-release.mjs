import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiUrl = 'https://api.github.com/repos/technopradyumn/prady/releases/latest';
const response = await fetch(apiUrl, {
  headers: {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Prady-Website-Release-Sync',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  },
});
if (!response.ok) throw new Error(`GitHub release lookup failed (${response.status} ${response.statusText})`);

const release = await response.json();
if (!release.tag_name || !Array.isArray(release.assets)) {
  throw new Error('GitHub returned release metadata without a tag or asset list.');
}

const releaseFiles = new Set(release.assets.map((asset) => asset.name));
const tag = release.tag_name;
const targetAssets = {
  'windows-x64': `prady-${tag}-x86_64-pc-windows-msvc.zip`,
  'macos-intel': `prady-${tag}-x86_64-apple-darwin.tar.gz`,
  'macos-arm': `prady-${tag}-aarch64-apple-darwin.tar.gz`,
  'linux-x64': `prady-${tag}-x86_64-unknown-linux-gnu.tar.gz`,
  'linux-arm': `prady-${tag}-aarch64-unknown-linux-gnu.tar.gz`,
};

for (const [platform, filename] of Object.entries(targetAssets)) {
  if (!releaseFiles.has(filename) || !releaseFiles.has(`${filename}.sha256`)) {
    throw new Error(`Release ${tag} is missing ${platform} archive or checksum (${filename}).`);
  }
}
for (const filename of ['install.sh', 'install.ps1']) {
  if (!releaseFiles.has(filename)) throw new Error(`Release ${tag} is missing installer asset ${filename}.`);
}

const downloadUrl = (name) => `https://github.com/technopradyumn/prady/releases/download/${tag}/${name}`;
const metadata = {
  version: tag.replace(/^v/, ''),
  releaseDate: (release.published_at || release.created_at).slice(0, 10),
  releaseNotesUrl: release.html_url,
  assets: {
    ...Object.fromEntries(Object.entries(targetAssets).map(([platform, filename]) => [
      platform,
      { url: downloadUrl(filename), checksum: downloadUrl(`${filename}.sha256`) },
    ])),
    'install-sh': 'https://raw.githubusercontent.com/technopradyumn/prady/main/install.sh',
    'install-ps1': 'https://raw.githubusercontent.com/technopradyumn/prady/main/install.ps1',
  },
};

const outputPath = path.join(root, 'public', 'latest.json');
const current = JSON.parse(await readFile(outputPath, 'utf8'));
if (JSON.stringify(current) === JSON.stringify(metadata)) {
  console.log(`Website release metadata is already current (${tag}).`);
} else {
  await writeFile(outputPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');
  console.log(`Updated website download metadata to ${tag}.`);
}
