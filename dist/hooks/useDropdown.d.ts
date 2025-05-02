type UseDropdown<T extends HTMLElement = HTMLElement> = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    ref: React.RefObject<T | null>;
};
export declare function useDropdown<T extends HTMLElement = HTMLElement>(): UseDropdown<T>;
export {};
