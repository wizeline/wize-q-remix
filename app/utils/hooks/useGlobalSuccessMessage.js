import useFindLoaderMatch from './useFindLoaderMatch';

function useGlobalSuccessMessage() {
  const loader = useFindLoaderMatch('root');
  if (!loader || !loader.data) return undefined;
  return loader.data.globalSuccess;
}

export default useGlobalSuccessMessage;
