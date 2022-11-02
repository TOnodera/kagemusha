import React, { useEffect } from 'react';

export const useValueRef = <T>(val: T) => {
  const ref = React.useRef(val);
  useEffect(() => {
    ref.current = val;
  });
  return ref;
};
