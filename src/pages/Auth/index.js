import { useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

import { AuthContext } from '../../store/contextStore';
import useLogout from '../../hooks/Auth/useLogout';

function Auth({ children }) {
  const logout = useLogout();
  const { getAuthData } = useContext(AuthContext);
  const urlObject = new URL(window.location.href);
  const authorizationCode = urlObject.searchParams.get('code');
  const authorizationState = urlObject.searchParams.get('state') || null;
  const codeVerifier = Cookies.get('code_verifier');
  const cookieState = Cookies.get('state');

  // remove privacy information from cookies
  Cookies.remove('code_verifier');
  Cookies.remove('state');

  useEffect(() => {
    if (authorizationState === null || authorizationState !== cookieState) {
      logout();
    }

    getAuthData({ authorizationCode, codeVerifier });
  }, []);

  return children;
}

export default Auth;
