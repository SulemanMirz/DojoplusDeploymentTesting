import { NextPage } from 'next';

interface ViewProps<T> {
  data: T | null;
}

export type NextPageProps<T> = NextPage<ViewProps<T>>;
