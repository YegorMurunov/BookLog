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

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
}

export default useOnClickOutside;
