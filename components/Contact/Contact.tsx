"use client";

import { useEffect, useState } from "react";
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
  },
  ge: {
    phone: "ტელეფონი",
    email: "ელ-ფოსტა",
    hours: "სამუშაო საათები",
    openMap: "რუკის გახსნა",
  },
} as const;

function formatPhone(raw: string) {
  if (raw.startsWith("+995") && raw.length === 13) {
    return `+995 ${raw.slice(4, 7)} ${raw.slice(7, 10)} ${raw.slice(10)}`;
  }
  return raw;
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

        <div className="overflow-hidden rounded-3xl border border-border shadow-lg lg:grid lg:grid-cols-2 dark:border-white/10">
          <div className="flex flex-col justify-center gap-2 bg-brand-chrome p-6 text-white lg:p-10">
            <div className="flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-white/8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/55">
                  Sleep &amp; Bed
                </p>
                <div className="space-y-1 text-sm leading-relaxed text-white/90 lg:text-base">
                  {t("address")
                    .split("\n")
                    .map((line) => (
                      <p key={line}>{line.trim()}</p>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-white/8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Phone className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/55">
                  {labels.phone}
                </p>
                <div className="space-y-3 text-sm leading-relaxed lg:text-base">
                  {PHONES.map(({ city, numbers }) => (
                    <div key={city}>
                      <p className="capitalize text-white/55">{t(city)}</p>
                      {numbers.map((number) => (
                        <a
                          key={number}
                          href={`tel:${number}`}
                          className="block text-white/90 transition hover:text-white hover:underline"
                        >
                          {formatPhone(number)}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-white/8"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Mail className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/55">
                  {labels.email}
                </span>
                <span className="text-sm text-white/90 lg:text-base">{EMAIL}</span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-2xl p-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Clock className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/55">
                  {labels.hours}
                </p>
                <p className="text-sm text-white/90 lg:text-base">
                  {t("mondayToFriday")} 10:00 – 19:00
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] bg-muted lg:min-h-full">
            {isClient ? (
              <iframe
                title="Sleep & Bed Georgia"
                src={MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : null}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-sm font-medium text-brand-chrome shadow-md backdrop-blur-sm transition hover:bg-white dark:bg-background/90 dark:text-foreground"
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
