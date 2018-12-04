export function formatPhoneNumber(string = '') {
	const stripped = string.replace(/[^0-9]/g, '');
	return stripped.replace(/([0-9]{3})([0-9]{3})([0-9]{1,4})/, '$1-$2-$3');
}
