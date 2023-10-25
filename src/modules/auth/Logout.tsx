import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// TODO add loading component
/**
 * @returns {JSX.Element} - Logout element.
 */
// eslint-disable import/prefer-default-export
export default function Logout(): JSX.Element {
  const { logout } = useAuth0();
  useEffect(() => {
    logout({
      returnTo: window.location.origin,
    });
  }, [logout]);

  return <div>loging out</div>;
}
