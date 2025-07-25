import { type RefObject, useEffect } from 'react';

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: MouseEvent | TouchEvent) => void
) {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};

		// document.addEventListener('mousedown', listener, true);
		// document.addEventListener('touchstart', listener, true);
		document.addEventListener('pointerdown', listener, true);

		return () => {
			// document.removeEventListener('mousedown', listener, true);
			// document.removeEventListener('touchstart', listener, true);
			document.removeEventListener('pointerdown', listener, true);
		};
	}, [ref, handler]);
}

export default useOnClickOutside;
