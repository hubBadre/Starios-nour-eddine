import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Un package-lock.json présent plus haut dans l'arborescence (C:\Users\SURFACE)
  // fait déduire à Next une mauvaise racine de workspace, ce qui fausse le
  // traçage des fichiers au déploiement. On l'ancre explicitement au projet.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Supabase Storage (uploads depuis l'admin)
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
      // Images de démonstration du seed
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
