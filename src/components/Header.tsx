import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import Bounded from '@/components/Bounded';
import Logo from '@/components/Logo';
import { getLocales } from '@/utils/getLocales';

export const Header = async ({ lang, uid }: { lang: string; uid?: string }) => {
  const client = createClient();
  const settings = await client.getSingle('settings', { lang });

  let alternateLanguages = [
    {
      lang: 'en-us',
      url: '/',
      lang_name: 'English - United States',
    },
    {
      lang: 'es-mx',
      url: '/es-mx',
      lang_name: 'Spanish - Mexico',
    },
  ];

  if (uid) {
    const currentDocument = await client.getByUID('page', uid, { lang });
    alternateLanguages = await getLocales(currentDocument, client);
  }

  return (
    <Bounded as='header' className='py-4 md:py-6 lg:py-8'>
      <div className=' flex gap-4 items-center justify-between sm:flex-row flex-col'>
        <Link href='/'>
          <Logo />
        </Link>

        <nav>
          <ul className='flex'>
            {settings.data.navigation.map(({ link, label }) => (
              <li key={label}>
                <PrismicNextLink field={link} className='py-3 p-3'>
                  {label}
                </PrismicNextLink>
              </li>
            ))}
            {alternateLanguages.map((alternate) => (
              <li key={alternate.lang}>
                <PrismicNextLink
                  href={alternate.url}
                  className={`py-3 p-3 ${lang === alternate.lang ? 'font-bold' : ''}`}>
                  {alternate.lang === 'en-us' ? 'EN' : 'ES'}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
};
