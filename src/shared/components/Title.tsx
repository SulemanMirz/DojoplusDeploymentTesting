import React, { FC } from 'react';
import Head from 'next/head';

interface Props {
  name?: string;
  slug: string;
}

export const Title: FC<Props> = ({ name, slug }) => {
  const listSlug =
    slug?.length > 0
      ? `${slug[0].toUpperCase()}${slug.slice(1, slug.length)}`
      : '';
  return (
    <Head>
      <title>{`DOJO+ ${name} · ${listSlug}`}</title>
    </Head>
  );
};
