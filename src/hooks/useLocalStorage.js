import { useEffect, useState } from "react";

const PREFIX = "codepen-clone-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null) {
      try {
        return JSON.parse(jsonValue);
      } catch (error) {
        console.error(
          `Error parsing localStorage key “${prefixedKey}”:`,
          error
        );
        return initialValue;
      }
    }

    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    console.log(`Saving to localStorage: ${prefixedKey} =`, value);
    if (value === undefined) return;
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
