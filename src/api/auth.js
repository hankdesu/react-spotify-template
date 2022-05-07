import { ACCOUNTS_API_TOKEN, CLIENT_ID, REDIRECT_URI } from '../constants';
import { authApiRequest } from '../utilities/apiRequest';

export function postAuthData({ authorizationCode, codeVerifier }) {
  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    code: authorizationCode,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier,
  });

  return authApiRequest({
    method: 'POST',
    url: ACCOUNTS_API_TOKEN,
    data,
  });
}

export function postRefreshToken({ refreshToken }) {
  const data = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    refresh_token: refreshToken,
  });

  return authApiRequest({
    method: 'POST',
    url: ACCOUNTS_API_TOKEN,
    data,
  });
}
