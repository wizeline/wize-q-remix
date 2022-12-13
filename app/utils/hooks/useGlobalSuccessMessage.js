import useFindLoaderMatch from 'app/utils/hooks/useFindLoaderMatch';

function useGlobalSuccessMessage() {
  const loader = useFindLoaderMatch('root');
  if (!loader || !loader.data) return undefined;
  return loader.data.globalSuccess;
}

export default useGlobalSuccessMessage;
