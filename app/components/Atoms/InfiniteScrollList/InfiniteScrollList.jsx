import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function InfiniteScrollList({ onFetch, children }) {
  const endOfListRef = useRef();

  const scrollContainer = null;
  const fetchScrollLimit = 500;

  const onScroll = ([entity]) => {
    if (entity.isIntersecting) {
      onFetch();
    }
  };

  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(onScroll, {
      root: scrollContainer,
      rootMargin: `${fetchScrollLimit}px`,
      threshold: 0,
    });
    if (endOfListRef && endOfListRef.current) {
      observer.current.observe(endOfListRef.current);
    }
    return () => {
      if (endOfListRef && endOfListRef.current) {
        observer.current.unobserve(endOfListRef.current);
      }
    };
  }, [children.props.children.length]);

  return (
    <div>
      {children}
      <div ref={endOfListRef} />
    </div>
  );
}

InfiniteScrollList.propTypes = {
  onFetch: PropTypes.func.isRequired,
  children: PropTypes.node,
};

InfiniteScrollList.defaultProps = {
  children: null,
};

export default InfiniteScrollList;
