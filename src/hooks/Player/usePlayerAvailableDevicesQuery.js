import { useQuery } from 'react-query';
import { getAvailableDevices } from '../../api/player';

export default function usePlayerAvailableDevicesQuery() {
  return useQuery('available_devices', getAvailableDevices);
}
