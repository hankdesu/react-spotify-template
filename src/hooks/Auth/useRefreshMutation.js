import { useMutation } from 'react-query';

import { postRefreshToken } from '../../api/auth';
import useLogout from './useLogout';

export default function useRefreshMutation({ setAccessToken, setExpiresIn }) {
  const logout = useLogout();
  return useMutation(postRefreshToken, {
    onSuccess: async (data) => {
      window.sessionStorage.setItem('access_token', data.access_token);
      window.sessionStorage.setItem('expires_in', data.expires_in);
      window.sessionStorage.setItem('expires_time', Date.now() + data.expires_in * 1000);
      setAccessToken(data.access_token);
      setExpiresIn(data.expires_in);
    },
    onError: async () => {
      logout();
    },
  });
}
