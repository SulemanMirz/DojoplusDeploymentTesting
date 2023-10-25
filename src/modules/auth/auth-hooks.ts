import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { createAction } from '@cobuildlab/react-simple-state/lib/actions';
import { useRouter as useHistory } from 'next/router';
import {
  OnTokenErrorEvent,
  OnTokenEvent,
} from '../../shared/events/token-event';

/**
 * @returns {void}
 */
export function useSetupAuth0Token(): boolean {
  const auth = useAuth0();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenAction = createAction(
      OnTokenEvent,
      OnTokenErrorEvent,
      async () => {
        const token = await auth.getIdTokenClaims();
        // eslint-disable-next-line no-underscore-dangle
        return { token: token?.__raw as string };
      },
    );

    if (auth.isAuthenticated) {
      setLoading(true);
      tokenAction().then(() => {
        setLoading(false);
      });
    }
  }, [auth, auth.getIdTokenClaims, auth.isAuthenticated]);

  // TODO: hanlde the error case when fetching the token
  return loading;
}
/**
 * @param {string} route - Default path to redirect.
 * @returns {void}
 */
export function useDefaultRedirect(route: string): void {
  const auth = useAuth0();
  const history = useHistory();
  useEffect(() => {
    if (auth.isAuthenticated && history.pathname === '/') {
      history.push(route);
    }
  }, [history, auth.isAuthenticated, route]);

  // TODO: hanlde the error case when fetching the token
}
