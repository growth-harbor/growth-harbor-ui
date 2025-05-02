import { useCallback, useEffect, useRef, useState } from 'react';
export function useDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
    useEffect(() => {
        if (!isOpen)
            return;
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                close();
            }
        };
        const handleKeyDown = (event) => {
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
