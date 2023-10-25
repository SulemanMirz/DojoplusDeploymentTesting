import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

/**
 * @description - Get router events and return a loading state.
 * @returns - Return loading state.
 */
export default function usePageTransition(): boolean {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart: (url: string) => void = (url) => {
      if (url !== router.asPath) setLoading(true);
    };
    const handleComplete: (url: string) => void = (url) => {
      if (url === router.asPath) setLoading(true);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return loading;
}
