import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Header } from '@/components/Header';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;
  const client = createClient();
  const page = await client.getSingle('homepage', { lang });

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const client = createClient();
  const page = await client.getSingle('homepage', { lang });

  return (
    <>
      <Header lang={lang} />
      <SliceZone slices={page.data.slices} components={components} />;
    </>
  );
}
