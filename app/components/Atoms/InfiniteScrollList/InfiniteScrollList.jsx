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
  const observer = new IntersectionObserver(onScroll, {
    root: scrollContainer,
    rootMargin: `${fetchScrollLimit}px`,
    threshold: 0,
  });

  useEffect(() => {
    if (endOfListRef && endOfListRef.current) {
      observer.observe(endOfListRef.current);
    }
    return () => {
      if (endOfListRef && endOfListRef.current) {
        observer.unobserve(endOfListRef.current);
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
