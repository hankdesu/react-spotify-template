import { useQuery } from 'react-query';
import { getAvailableGenreSeeds } from '../../api/genres';

export default function useAvailableGenreSeedsQuery() {
  return useQuery('genre_seeds', getAvailableGenreSeeds);
}
