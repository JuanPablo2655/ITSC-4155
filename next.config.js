/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,

	/**
	 * If you are using `appDir` then you must comment the below `i18n` config out.
	 *
	 * @see https://github.com/vercel/next.js/issues/41980
	 */
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
			},
			{
				protocol: 'https',
				hostname: 'api.escuelajs.co',
			},
			{
				protocol: 'https',
				hostname: 'images.offerup.com',
			},
			{
				protocol: 'https',
				hostname: 'placeimg.com',
			},
			{
				protocol: 'https',
				hostname: 'i.pinimg.com',
			},
			{
				protocol: 'https',
				hostname: 'www.sainsburys.co.uk',
			},
			{
				protocol: 'https',
				hostname: 'encrypted-tbn0.gstatic.com',
			},
			{
				protocol: 'https',
				hostname: 'nikearprod.vtexassets.com',
			},
			{
				protocol: 'https',
				hostname: 'www.dexter.com.ar',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
			},
			{
				protocol: 'https',
				hostname: 'm.media-amazon.com',
			},
			{
				protocol: 'https',
				hostname: 'www.pngkey.com',
			},
			{
				protocol: 'https',
				hostname: 'img01.ztat.net',
			},
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
			},
			{
				protocol: 'https',
				hostname: 'www.tradeinn.com',
			},
			{
				protocol: 'https',
				hostname: 'www.avisualpro.es',
			},
			{
				protocol: 'https',
				hostname: 'www.markamania.es',
			},
			{
				protocol: 'https',
				hostname: 'www.bambinodoggies.com',
			},
			{
				protocol: 'https',
				hostname: 'tinyjpg.com',
			},
			{
				protocol: 'https',
				hostname: 'www.slikomania.rs',
			},
		],
	},
};

export default config;
