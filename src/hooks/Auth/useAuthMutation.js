import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { postAuthData } from '../../api/auth';
import useLogout from './useLogout';

export default function useAuthMutation({
  setAccessToken,
  setRefreshToken,
  setExpiresIn,
}) {
  const logout = useLogout();
  const navigate = useNavigate();

  return useMutation(postAuthData, {
    onSuccess: async (data) => {
      window.sessionStorage.setItem('access_token', data.access_token);
      window.sessionStorage.setItem('refresh_token', data.refresh_token);
      window.sessionStorage.setItem('expires_in', data.expires_in);
      window.sessionStorage.setItem('expires_time', Date.now() + data.expires_in * 1000);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setExpiresIn(data.expires_in);
      navigate('/home');
    },
    onError: async () => {
      logout();
    },
  });
}
