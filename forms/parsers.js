export function parsePhoneNumber(string = '') {
	return string.replace(/[^0-9]/g, '');
}
