import "./globals.css";

import { SiteHeader } from "./components/site-header";
import { ThemeProvider } from "./components/providers";

import { SiteFooter } from "@/components/site-footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-pt-[3.5rem]'>
      <body
        className=
          "min-h-screen bg-background font-sans antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className='flex relative min-h-dvh flex-col bg-background'>
            <SiteHeader />
            <main className='flex-1'>{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}