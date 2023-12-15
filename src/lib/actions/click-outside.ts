type ClickOutsideCallback = () => void;

interface ClickOutside {
	update: (newCallbackFunction: ClickOutsideCallback) => void;
	destroy: () => void;
}

export function clickOutside(
	element: HTMLElement,
	callbackFunction: ClickOutsideCallback
): ClickOutside {
	function onClick(event: MouseEvent) {
		if (!element.contains(event.target as Node)) {
			callbackFunction();
		}
	}

	document.body.addEventListener('click', onClick);

	return {
		update(newCallbackFunction: ClickOutsideCallback) {
			callbackFunction = newCallbackFunction;
		},
		destroy() {
			document.body.removeEventListener('click', onClick);
		}
	};
}

export default clickOutside;
