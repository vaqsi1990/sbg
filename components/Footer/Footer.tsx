import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.facebook.com/SleepandBed.Georgia", Icon: FaFacebook, label: "Facebook" },
  {
    href: "https://www.instagram.com/sleepandbed_geo?igsh=Zm1jcjV3eGhwZWRj&utm_source=qr",
    Icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@sleepandbed_geo?_t=ZS-8v5HPyIrTJx&_r=1",
    Icon: FaTiktok,
    label: "TikTok",
  },
];

function Footer() {
  const t = useTranslations("navitems");

  const links = [
    { href: "/about", label: t("aboutUs") },
    { href: "/all", label: t("products") },
    { href: "/why", label: t("whySleepAndBed") },
    { href: "/catalogue", label: t("catalogue") },
  ];

  return (
    <footer className="relative bg-brand-chrome/95 backdrop-blur-md border-t border-white/10 text-white">
      <div className="container mx-auto px-4 py-14 lg:py-16">
        <div className="flex flex-col items-center gap-8">
          <p className="text-2xl font-bold tracking-tight">Sleep &amp; Bed Georgia</p>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[15px] text-white/80 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-5">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>

          <p className="text-sm text-white/50 pt-4 border-t border-white/10 w-full text-center">
            © {new Date().getFullYear()} Sleep &amp; Bed Georgia
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
