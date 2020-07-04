let _baseURL = 'https://gank.io/api/v2';

export function configBaseURL(url) {
	// 简单校验
	if (url && url.indexOf(http) !== -1) {
		_baseURL = url;
	}
}

export function getURL(path) {
	let url = path;
	if (path.indexOf('http') === -1) {
		url = _baseURL + path;
	}
	return url;
}