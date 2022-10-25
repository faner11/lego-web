import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import ignoreStylePlugin from 'vite-ignore-style'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ignoreStylePlugin({
      libraryName: 'antd'
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@root-entry-name': 'variable'
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    cors: true
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})
