import { useCallback, useEffect, useRef, useState } from 'react';

type UseDropdown<T extends HTMLElement = HTMLElement> = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  ref: React.RefObject<T | null>;
};

export function useDropdown<T extends HTMLElement = HTMLElement>(): UseDropdown<T> {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<T | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  return { isOpen, open, close, toggle, ref };
}
