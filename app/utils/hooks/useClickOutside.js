import { useEffect, useRef, useState } from 'react';

const useClickOutside = (exceptionState = false) => {
  const wrapperRef = useRef(null);
  const [state, setState] = useState(false);

  const handleClickOutside = (event) => {
    if (wrapperRef.current
      && !wrapperRef.current.contains(event.target)
      && state && !exceptionState) {
      setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state, exceptionState]);

  return { state, setState, wrapperRef };
};

export default useClickOutside;
