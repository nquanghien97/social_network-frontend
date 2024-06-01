import { useCallback, useState } from 'react';

const LoadMore = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
} = {}) => {
  const [observer, setOserver] = useState<IntersectionObserver>();
  const [isIntersecting, setIntersecting] = useState(false);

  const measureRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        const observers = new IntersectionObserver(
          ([entry]) => {
            setIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold },
        );

        observers.observe(node);
        setOserver(observer);
      }
    },
    [root, rootMargin, threshold],
  );

  return { measureRef, isIntersecting, observer };
};

export default LoadMore;
