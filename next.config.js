/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true, // Enable Server Actions
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: { unoptimized: true },
};

module.exports = nextConfig;
