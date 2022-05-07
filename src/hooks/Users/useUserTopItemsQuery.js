import { useQuery } from 'react-query';
import { getUserTopItems } from '../../api/users';

function transformTopItems(data) {
  const { items = [] } = data;
  const itemsData = items.map((item) => {
    const album = item?.album || item?.track?.album;
    const id = item?.id || item?.track?.id;
    return {
      id,
      image: album?.images[0]?.url || '',
      name: album?.name,
    };
  });
  return itemsData;
}

export default function useUserTopItemsQuery({ type, params }) {
  return useQuery(['user_top_items', { type, params }], getUserTopItems, { retry: false, select: transformTopItems });
}
