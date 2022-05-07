import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../store/contextStore';
import useAuthMutation from '../hooks/Auth/useAuthMutation';
import useRefreshMutation from '../hooks/Auth/useRefreshMutation';

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    window.sessionStorage.getItem('access_token') || null,
  );
  const [refreshToken, setRefreshToken] = useState(
    window.sessionStorage.getItem('refresh_token') || null,
  );
  const [expiresIn, setExpiresIn] = useState(window.sessionStorage.getItem('expires_in') || 3600);
  const authMutation = useAuthMutation({
    setAccessToken,
    setRefreshToken,
    setExpiresIn,
  });
  const refreshMutation = useRefreshMutation({ setAccessToken, setExpiresIn });

  function getAuthData({ authorizationCode, codeVerifier }) {
    authMutation.mutate({ authorizationCode, codeVerifier });
  }

  function updateAccessToken() {
    refreshMutation.mutate({ refreshToken });
  }

  useEffect(() => {
    const beforeExpireFiveMinutes = Number(expiresIn) * 1000 - 5 * 60000;
    if (accessToken !== null) {
      setTimeout(() => {
        updateAccessToken();
      }, beforeExpireFiveMinutes);
    }
  }, [accessToken]);

  const contextData = useMemo(
    () => ({
      accessToken,
      getAuthData,
    }),
    [accessToken, getAuthData],
  );

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
