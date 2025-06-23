import type {NextConfig} from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('https://cdn2.thecatapi.com/**'), new URL('https://30.media.tumblr.com/*')],
    },
    devIndicators: false,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: isDev
                    ? 'http://localhost:3000/api/:path*'      // локальный API
                    : 'http://cat-pinterest-api:3000/api/:path*', // Docker / прод
            },
        ];
    },
};

export default nextConfig;
