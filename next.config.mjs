/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{ // Whitelist the domains to load images from remote uri
    remotePatterns:[
        {
            protocol: 'https',
            hostname: 'media.licdn.com', // used for avatar images - google signin
            port: '',
            pathname: '/**',
        }
    ]
},
    experimental: {
        serverComponentsExternalPackages: ['pdf2json'],
      },
};

export default nextConfig;
