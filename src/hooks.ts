import { useEffect, useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const storedValue = sessionStorage.getItem(key);
  const [value, setValue] = useState(
    storedValue ? JSON.parse(storedValue) : initialValue
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState(
    storedValue ? JSON.parse(storedValue) : initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
