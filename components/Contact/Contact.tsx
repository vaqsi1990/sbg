"use client";

import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";

function Contact() {
  const t = useTranslations("contactinfo");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="page-section">
      <div className="container mx-auto px-4 lg:px-6">
        <h2 className="section-heading-center">{t("contacts")}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          <div className="elevated-card p-6 lg:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <div className="text-sm lg:text-base leading-relaxed text-muted-foreground">
                {t("address")
                  .split("\n")
                  .map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <FaPhone className="text-lg" />
              </div>
              <div className="text-sm lg:text-base leading-relaxed text-muted-foreground">
                {t("batumi")}: <br /> +995557394374, <br /> +995568613022 <br />
                {t("kutaisi")}: <br /> +995514079898
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <FaEnvelope className="text-lg" />
              </div>
              <a
                href="mailto:Sleepandbedgeorgia@gmail.com"
                className="text-sm lg:text-base leading-relaxed text-brand hover:underline"
              >
                Sleepandbedgeorgia@gmail.com
              </a>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <FaClock className="text-lg" />
              </div>
              <div className="text-sm lg:text-base leading-relaxed text-muted-foreground">
                <p>{t("mondayToFriday")}</p>
                <p>10:00 - 19:00</p>
              </div>
            </div>
          </div>

          <div className="elevated-card overflow-hidden min-h-[320px] lg:min-h-0">
            {isClient && (
              <iframe
                width="100%"
                height="100%"
                className="border-0 w-full min-h-[320px] lg:min-h-[420px]"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.203682968321!2d41.6285049!3d41.6399867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40678700245cd783%3A0xa1c772006499c03c!2sSleep%26Bed%20Georgia!5e0!3m2!1sen!2s!4v1712549012345"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
