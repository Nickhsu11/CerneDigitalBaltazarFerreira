import { defineConfig } from 'astro/config';

// Uma pagina = <caminho>/index.html.
export default defineConfig({
  outDir: './dist',
  build: { format: 'directory', inlineStylesheets: 'never' },
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
