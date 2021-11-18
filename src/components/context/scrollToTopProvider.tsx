import React, { useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";


const ScrollToTopProvider: React.FC = ({ children }) => {
  const { pathname } = useLocation();

  const ref: React.MutableRefObject<HTMLDivElement|null> = useRef(null);

  useEffect(() => {
    if (ref.current) {
      console.warn(ref)
      ref.current.scrollTo(0,0)
    }
  }, [pathname]);

  return (
    <div ref={ref}>
      {
        children
      }
    </div>
  )
}

export default ScrollToTopProvider
