import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();
  function logout() {
    window.sessionStorage.removeItem('access_token');
    window.sessionStorage.removeItem('refresh_token');
    window.sessionStorage.removeItem('expires_in');
    window.sessionStorage.removeItem('expires_time');
    navigate('/');
  }
  return logout;
}

export default useLogout;
