import { useFindLoaderMatch } from './useFindLoaderMatch';

export function useUser() {
  const loader = useFindLoaderMatch('root');
  if (!loader || !loader.data) return undefined;
  return loader.data.profile;
}
