import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";
import {routing} from '@/i18n/routing';
import Footer from "@/components/Footer/Footer";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import SIdeLogo from "@/components/SideLogo/SideLogo";

import { getMessages } from "next-intl/server";

const quicksand = Quicksand({
  variable: "--font-quicksand",  
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S&B",
  description: "sleepandbed",

};

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale} >
       <head>
       <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${quicksand.variable}  antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>


        <Header />
        <SIdeLogo />
        {children}
      <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
 
 
  );
}
