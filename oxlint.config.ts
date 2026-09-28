import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: { correctness: 'error' },
  env: { browser: true },
  ignorePatterns: ['dist', 'node_modules'],
});
