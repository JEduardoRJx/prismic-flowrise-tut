import type { Metadata } from 'next';
import '@/app/globals.css';
import clsx from 'clsx';
import { Nunito, Nunito_Sans } from 'next/font/google';
import { createClient, repositoryName } from '@/prismicio';
import { Footer } from '@/components/Footer';
import { PrismicPreview } from '@prismicio/next';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
});

export const generateMetadata = async (): Promise<Metadata> => {
  const client = createClient();
  const settings = await client.getSingle('settings');

  return {
    title: settings.data.site_title || 'Flowrise fallback',
    description:
      settings.data.meta_description || 'Flowrise is the relaxing app for you.',
    openGraph: {
      images: [settings.data.og_image.url || ''],
    },
  };
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={clsx(nunito.variable, nunitoSans.variable)}>
      <body>
        {children}
        <Footer />
        <div className='fixed bg-gradient-to-tr from-emerald-50 to-cyan-50 z-[-1] inset-0 opcatiy-50' />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
