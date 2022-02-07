import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  // console.log(key, defaultValue);
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    // console.log(JSON.parse(jsonValue));

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue == 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
