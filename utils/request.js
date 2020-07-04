import { getURL } from './config';
import { isMock, mockRequest } from './mock';

export function getData(path, data) {
	return request(path, data, 'GET');
}

export function postData(path, data) {
	return request(path, data, 'POST');
}

export function request(path, data, method = 'POST') {
	const url = getURL(path);
	if (isMock()) {
		return mockRequest(path, data, method);
	}
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			data: data || {},
			method,
			success(res) {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					console.log(`${path} 请求成功 ${JSON.stringify(res)}`);
					resolve(res.data);
				} else {
					console.log(`${path} 请求失败 ${JSON.stringify(res)}`);
					reject({
						msg: (res.data && res.data.errorMsg) || '未知错误',
						status: (res.data && res.data.errorCode) || 500
					});
				}
			},
			fail(err) {
				console.log(`${path} 请求失败 ${JSON.stringify(err)}`);
				reject({
					msg: '请求失败',
					status: 500
				});
			}
		});
	});
}
