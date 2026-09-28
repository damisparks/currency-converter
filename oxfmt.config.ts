import { defineConfig } from 'oxfmt';

export default defineConfig({
  semi: true,
  singleQuote: true,
  printWidth: 100,
  sortPackageJson: true,
  ignorePatterns: ['dist', 'node_modules', 'src/components/ui/**', 'components.json'],
});
