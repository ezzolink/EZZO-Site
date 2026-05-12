import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'EZZO Digital',
                short_name: 'EZZO',
                description: 'Agência Digital - Design, Tecnologia e Audiovisual',
                theme_color: '#0a0a0f',
                background_color: '#0a0a0f',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait',
                icons: [
                    {
                        src: 'https://res.cloudinary.com/djhn3zwkw/image/upload/v1765715698/1-Photoroom_ucz9sl.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'https://res.cloudinary.com/djhn3zwkw/image/upload/v1765715698/1-Photoroom_ucz9sl.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'https://res.cloudinary.com/djhn3zwkw/image/upload/v1765715698/1-Photoroom_ucz9sl.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/generativelanguage\.googleapis\.com\/.*/i,
                        handler: 'NetworkOnly',
                        options: {
                            backgroundSync: {
                                name: 'google-api-sync',
                                options: {
                                    maxRetentionTime: 24 * 60
                                }
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'cloudinary-images',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
                            }
                        }
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
