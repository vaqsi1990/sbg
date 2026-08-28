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
          pathname: "/f/**",
        },
        {
          protocol: "https",
          hostname: "ufs.sh",
        },
        {
          protocol: "https",
          hostname: "*.ufs.sh",
        },
      ],
    },
  };
 
export default withNextIntl(nextConfig);