'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTransition, useState } from 'react';
import Image from 'next/image';
import Am from '@/public/hero/america.png';
import Ge from '@/public/hero/georgia.png';

export default function LocaleSwitcher() {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const localeActive = useLocale();

  
  const handleChange = (nextLocale: string) => {
    setOpen(false);
    startTransition(() => {
      const newPath = `/${nextLocale}${pathname.replace(/^\/[a-zA-Z]+/, '')}`;
      const query = searchParams?.toString();
      router.replace(`${newPath}${query ? `?${query}` : ''}`);
    });
  };

  const locales = [
    { code: 'en', label: 'English', flag: Am },
    { code: 'ge', label: 'ქართული', flag: Ge },
  ];

  const currentLocale = locales.find(l => l.code === localeActive);

  return (
    <div className="relative inline-block h-[40px] text-left">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center gap-2 h-[40px] px-3 w-[140px] py-2 border border-white/20 rounded-full bg-white/10 text-white md:text-[18px] text-[16px] backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <Image src={currentLocale?.flag || Am} alt="flag" width={20} height={20} className="rounded-full" />
        {currentLocale?.label}
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-popover border border-border rounded-xl shadow-xl overflow-hidden">
          {locales.map(locale => (
            <li
              key={locale.code}
              className="flex items-center gap-2 px-3 text-popover-foreground py-2.5 hover:bg-muted cursor-pointer transition-colors"
              onClick={() => handleChange(locale.code)}
            >
              <Image src={locale.flag} alt={`${locale.label} flag`} width={20} height={20} className="rounded-full" />
              {locale.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
