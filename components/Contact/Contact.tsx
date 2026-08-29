"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.203682968321!2d41.6285049!3d41.6399867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40678700245cd783%3A0xa1c772006499c03c!2sSleep%26Bed%20Georgia!5e0!3m2!1sen!2s!4v1712549012345";
const MAP_LINK = "https://maps.google.com/?q=Sleep%26Bed%20Georgia";
const EMAIL = "Sleepandbedgeorgia@gmail.com";

const PHONES = [
  { city: "batumi" as const, numbers: ["+995557394374", "+995568613022"] },
  { city: "kutaisi" as const, numbers: ["+995514079898"] },
];

const LABELS = {
  en: {
    phone: "Phone",
    email: "Email",
    hours: "Hours",
    openMap: "Open map",
    subtitle: "Visit a showroom or get in touch",
  },
  ge: {
    phone: "ტელეფონი",
    email: "ელ-ფოსტა",
    hours: "სამუშაო საათები",
    openMap: "რუკის გახსნა",
    subtitle: "ეწვიეთ შოურუმს ან დაგვიკავშირდით",
  },
} as const;

function formatPhone(raw: string) {
  if (raw.startsWith("+995") && raw.length === 13) {
    return `+995 ${raw.slice(4, 7)} ${raw.slice(7, 10)} ${raw.slice(10)}`;
  }
  return raw;
}

function ContactRow({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  href?: string;
  children: ReactNode;
}) {
  const className =
    "group flex items-start gap-4 rounded-2xl bg-white/6 p-4 ring-1 ring-white/10 transition duration-300 hover:bg-white/12 hover:ring-white/20 lg:p-5";

  const body = (
    <>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 transition duration-300 group-hover:bg-white/20">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-white/55">
          {label}
        </span>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

function Contact() {
  const t = useTranslations("contactinfo");
  const locale = useLocale();
  const labels = locale === "en" ? LABELS.en : LABELS.ge;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="page-section">
      <div className="container mx-auto px-4 lg:px-6">
        <h2 className="section-heading-center">{t("contacts")}</h2>
       

        <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative flex flex-col justify-center gap-3 bg-brand-chrome p-6 text-white lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_55%)]"
            />

            <div className="relative space-y-3">
              <ContactRow icon={MapPin} label="Sleep & Bed">
                <span className="space-y-1 text-base leading-relaxed text-white/90 lg:text-lg">
                  {t("address")
                    .split("\n")
                    .map((line) => (
                      <span key={line} className="block">
                        {line.trim()}
                      </span>
                    ))}
                </span>
              </ContactRow>

              <ContactRow icon={Phone} label={labels.phone}>
                <span className="flex flex-col gap-3">
                  {PHONES.map(({ city, numbers }) => (
                    <span key={city} className="block">
                      <span className="mb-1.5 block text-sm capitalize text-white/60">
                        {t(city)}
                      </span>
                      <span className="flex flex-wrap gap-2">
                        {numbers.map((number) => (
                          <a
                            key={number}
                            href={`tel:${number}`}
                            className="inline-flex rounded-full bg-white/10 px-3.5 py-2 text-base text-white/95 ring-1 ring-white/10 transition hover:bg-white hover:text-brand-chrome"
                          >
                            {formatPhone(number)}
                          </a>
                        ))}
                      </span>
                    </span>
                  ))}
                </span>
              </ContactRow>

              <ContactRow icon={Mail} label={labels.email} href={`mailto:${EMAIL}`}>
                <span className="inline-flex items-center gap-1.5 text-base text-white/90 lg:text-lg">
                  {EMAIL}
                  <ArrowUpRight
                    className="h-4 w-4 opacity-70 transition group-hover:opacity-100"
                    strokeWidth={2.25}
                  />
                </span>
              </ContactRow>

              <ContactRow icon={Clock} label={labels.hours}>
                <span className="text-base text-white/90 lg:text-lg">
                  {t("mondayToFriday")} 10:00 – 19:00
                </span>
              </ContactRow>
            </div>
          </div>

          <div className="relative min-h-[340px] bg-muted lg:min-h-[540px]">
            {isClient ? (
              <iframe
                title="Sleep & Bed Georgia"
                src={MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : null}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-base font-semibold text-brand-chrome shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-background dark:text-foreground"
            >
              {labels.openMap}
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
