import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "utfs.io",
          pathname: "/f/**", // ეს ხაზს უსვამს რომ სურათები ამ path-ზეა
        },
      ],
    },
  };
 
export default withNextIntl(nextConfig);