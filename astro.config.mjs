import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';

const pradyGrammar = JSON.parse(
  fs.readFileSync('./src/syntaxes/prady.tmLanguage.json', 'utf-8')
);

// Register custom Prady grammar for Shiki
const customPradyLang = {
  ...pradyGrammar,
  name: 'prady',
  aliases: ['pr'],
};

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      langs: [customPradyLang],
      wrap: true
    }
  }
});
