import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: '../src/main/resources/static',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/katex')) {
            return 'vendor-katex';
          }
          if (
            id.includes('node_modules/mermaid') ||
            id.includes('node_modules/cytoscape') ||
            id.includes('node_modules/elkjs') ||
            id.includes('node_modules/dagre')
          ) {
            return 'vendor-diagrams';
          }
          if (id.includes('node_modules/highlight.js')) {
            return 'vendor-highlight';
          }
          if (
            id.includes('node_modules/react-markdown') ||
            id.includes('node_modules/remark-') ||
            id.includes('node_modules/rehype-') ||
            id.includes('node_modules/micromark') ||
            id.includes('node_modules/mdast') ||
            id.includes('node_modules/hast') ||
            id.includes('node_modules/parse5') ||
            id.includes('node_modules/unist') ||
            id.includes('node_modules/vfile') ||
            id.includes('node_modules/property-information') ||
            id.includes('node_modules/space-separated-tokens') ||
            id.includes('node_modules/comma-separated-tokens')
          ) {
            return 'vendor-markdown';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800,
  }
})
