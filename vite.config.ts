import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const stripLucideSourceMaps = () => ({
  name: 'strip-lucide-sourcemaps',
  enforce: 'pre' as const,
  apply: 'serve' as const,
  transform(code: string, id: string) {
    if (!id.includes('node_modules/lucide-react/dist/esm')) return null;
    // Remove sourceMappingURL hints that point to missing .map files
    return {
      code: code.replace(/\/\/# sourceMappingURL=.*$/gm, ''),
      map: null,
    };
  },
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        sourcemapIgnoreList(sourcePath) {
          return sourcePath.includes('lucide-react');
        },
      },
      plugins: [stripLucideSourceMaps(), react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      optimizeDeps: {
        // lucide-react has a broken source map for undo-2; skip prebundle to avoid esbuild parsing the map
        exclude: ['lucide-react'],
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        }
      }
    };
});
