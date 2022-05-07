import Cookies from 'js-cookie';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { LoginButton } from '../../components/Button';
import { generateCodeChallenge, generateRandomString } from '../../utilities/helper';
import {
  ACCOUNTS_AUTHORIZE, SCOPE, CLIENT_ID, REDIRECT_URI,
} from '../../constants';

function Login() {
  const loginHandler = async () => {
    // Generate PKCE code
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Generate state for CSRF
    const state = uuidv4();
    Cookies.set('state', state);
    Cookies.set('code_verifier', codeVerifier);

    // Create spotify authorize url
    const url = new URL(ACCOUNTS_AUTHORIZE);
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPE,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
      state,
    }).toString();

    // Redirect to spotify authorize url
    window.location.assign(url);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <LoginButton onClick={loginHandler} />
    </div>
  );
}

export default Login;
