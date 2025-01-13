import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'sistemas.mindef.gob.bo',
				port: '',
				pathname: '/assets/img/portfolio/**',
			},
{
				protocol: 'https',
				hostname: 'www.mindef.gob.bo',
				port: '',
				pathname: 'sites/default/files/**',
			}
		],
	},
};
export default nextConfig;
